import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButton } from 'primeng/selectbutton';
import { SelectState } from '../interfaces/select-state';
import { TmdbService } from '../../tmdb/services/tmdb.service';
import { Genre } from '../interfaces/genres-response';
import { DatePicker } from 'primeng/datepicker';
import { Filters } from '../interfaces/filters';
import { Select } from 'primeng/select';
import { FriendApiService } from '../../friends/services/friend-api.service';
import { FriendStateService } from '../../friends/services/friend-state.service';
import { FriendsSelect } from '../interfaces/friends-select';
import { AvatarModule } from 'primeng/avatar';
import { MatchingApiService } from '../services/matching-api.service';
import { AddMatching } from '../interfaces/add-matching';

@Component({
  selector: 'app-matching-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    MultiSelectModule,
    SelectButton,
    DatePicker,
    Select,
    AvatarModule,
  ],
  templateUrl: './matching-form.component.html',
  styleUrl: './matching-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly tmdbService = inject(TmdbService);
  private readonly messageService = inject(MessageService);
  private readonly friendStateService = inject(FriendStateService);
  private readonly friendsApiService = inject(FriendApiService);
  private readonly matchingApiService = inject(MatchingApiService);

  friendIdFromQuery = signal<string | null>(null);
  types = signal<Array<SelectState>>([
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
  ]);
  genres = signal<Array<Genre>>([]);
  friendsSelect = signal<Array<FriendsSelect>>([]);

  matchingForm = this.fb.group({
    type: ['movie', [Validators.required]],
    genres: [[] as Array<number>, [Validators.required]],
    startDate: [null, [Validators.required]],
    endDate: [new Date(), [Validators.required]],
    friends: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('Query Params:', params['friendId']);
      this.friendIdFromQuery.set(params['friendId'] || null);
    });
    this.friendsApiService.getUserFriends().subscribe({
      next: (friends) => {
        this.friendStateService.setFriends(friends);

        // Format friends
        const formatted = friends.map((friend) => ({
          email: friend.friendEmail,
          id: friend.friendId,
          image: friend.friendProfileImage,
          name: friend.friendName,
        }));

        this.friendsSelect.set(formatted);

        if (this.friendIdFromQuery()) {
          const matchingFriend = formatted.find(
            (f) => f.id === this.friendIdFromQuery()
          );
          if (matchingFriend) {
            console.log('Matching Friend:', matchingFriend);
            this.matchingForm.get('friends')?.setValue(matchingFriend.id);
          }
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      },
    });
    this.getCurrentGenres('movie');
    this.matchingForm.get('type')?.valueChanges.subscribe((selectedType) => {
      console.log('Selected Type:', selectedType);
      if (selectedType) this.getCurrentGenres(selectedType);
    });
  }

  getCurrentGenres(selectedType: string) {
    this.matchingForm.get('genres')?.reset([]);
    this.genres.set([]);
    this.tmdbService.getGenres(selectedType).subscribe({
      next: (response) => {
        this.genres.set(response.genres);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load genres',
        });
      },
    });
  }

  onSubmit() {
    if (this.matchingForm.valid) {
      const { type, genres, startDate, endDate, friends } =
        this.matchingForm.value;
      const filters: Filters = {
        genres: genres!,
        startDate: startDate!,
        endDate: endDate!,
      };

      let AddMatchingData: any = {
        user2Id: friends,
      };

      if (type == 'movie')
        this.tmdbService.searchForMovies(filters).subscribe({
          next: (response) => {
            console.log(response);
            AddMatchingData = {
              ...AddMatchingData,
              shows: response.results,
            };
            console.log('Add Matching Data:', AddMatchingData);
            this.AddMatching(AddMatchingData);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to get movies',
            });
          },
        });
      else
        this.tmdbService.searchForTVShows(filters).subscribe({
          next: (response) => {
            console.log(response);
            AddMatchingData = {
              ...AddMatchingData,
              shows: response.results,
            };
            console.log('Add Matching Data:', AddMatchingData);
            this.AddMatching(AddMatchingData);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to get tv shows',
            });
          },
        });
    }
  }

  AddMatching(AddMatchingData: AddMatching) {
    this.matchingApiService.addMatching(AddMatchingData).subscribe({
      next: (response) => {
        console.log('Add Matching Response:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Matching added successfully',
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add matching',
        });
      },
    });
  }
}
