import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButton } from 'primeng/selectbutton';
import { SelectState } from '../interfaces/select-state';
import { TmdbService } from '../../tmdb/services/tmdb.service';
import { Genre } from '../interfaces/genres-response';
import { DatePicker } from 'primeng/datepicker';
import { Filters } from '../interfaces/filters';
import { filter } from 'rxjs';

@Component({
  selector: 'app-matching-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    MultiSelectModule,
    SelectButton,
    DatePicker,
  ],
  templateUrl: './matching-form.component.html',
  styleUrl: './matching-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly tmdbService = inject(TmdbService);
  private readonly messageService = inject(MessageService);

  types = signal<Array<SelectState>>([
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
  ]);
  genres = signal<Array<Genre>>([]);

  matchingForm = this.fb.group({
    type: ['movie', [Validators.required]],
    genres: [[] as Array<number>, [Validators.required]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
  });

  ngOnInit(): void {
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
      const { type, genres, startDate, endDate } = this.matchingForm.value;
      const filters: Filters = {
        genres: genres!,
        startDate: startDate!,
        endDate: endDate!,
      };

      if (type == 'movie')
        this.tmdbService.searchForMovies(filters).subscribe({
          next: (response) => {
            console.log(response)
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
            console.log(response)
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
}
