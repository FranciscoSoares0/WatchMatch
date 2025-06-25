import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatchingApiService } from '../services/matching-api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Matching } from '../interfaces/matching';
import { Show } from '../interfaces/shows-response';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CarousselSkeletonLoaderComponent } from '../caroussel-skeleton-loader/caroussel-skeleton-loader.component';
import { AuthService } from '../../auth/services/auth.service';
import { UpdateMatching } from '../interfaces/update-matching';
import { MatchingCarrousselComponent } from '../matching-carroussel/matching-carroussel.component';
import { MatchingResultsComponent } from '../matching-results/matching-results.component';
import { MatchingSubmittedChoicesComponent } from '../matching-submitted-choices/matching-submitted-choices.component';

@Component({
  selector: 'app-matching-selection',
  imports: [
    ButtonModule,
    CommonModule,
    CarousselSkeletonLoaderComponent,
    MatchingCarrousselComponent,
    MatchingResultsComponent,
    MatchingSubmittedChoicesComponent
  ],
  templateUrl: './matching-selection.component.html',
  styleUrl: './matching-selection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingSelectionComponent implements OnInit {
  private readonly matchingApiService = inject(MatchingApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  matching = signal<Matching | null>(null);
  shows = signal<Show[]>([]);
  approvedShows = signal<Show[]>([]);
  rejectedShows = signal<Show[]>([]);
  user1ApprovedShows = signal<Show[]>([]);
  user2ApprovedShows = signal<Show[]>([]);
  userSig = this.authService.userSig();
  loading = signal<boolean>(true);

  isUser1 = signal<boolean>(false);
  user1Status = signal<string>('pending');
  user2Status = signal<string>('pending');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const matchingId = params.get('matchingId');
      if (matchingId)
        this.matchingApiService.getMatchingById(matchingId).subscribe({
          next: (response) => {
            if (response) {
              console.log(response);
              this.loading.set(false);
              this.matching.set(response);
              if (response.shows) this.shows.set(response.shows.sort((a, b) => a.title!.localeCompare(b.title!)));
              if (response.user1Id === this.userSig?._id)
                this.isUser1.set(true)
              else
                this.isUser1.set(false);
              if(response.statusUser1)
                this.user1Status.set(response.statusUser1);
              if(response.statusUser2)
                this.user2Status.set(response.statusUser2);
              if( response.user1ApprovedShows)
                this.user1ApprovedShows.set(response.user1ApprovedShows);
              if( response.user2ApprovedShows) 
                this.user2ApprovedShows.set(response.user2ApprovedShows);
            }
          },
          error: (response) => {
            this.loading.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.error.message,
            });
          },
        });
    });
  }


  isSubmissionDisabled(): boolean {
    const total = this.shows().length;
    const approved = this.approvedShows().length;
    const rejected = this.rejectedShows().length;
    return approved + rejected < total;
  }

  SubmitMatching() {
    const updateUserShowData: UpdateMatching = {
      userShows: this.approvedShows(),
    };

    const matchingId: string = this.matching()!._id;

    this.matchingApiService
      .updateUserMatchingShows(updateUserShowData, matchingId)
      .subscribe({
        next: (response) => {
          this.isUser1() ? this.user1Status.set('completed') : this.user2Status.set('completed');
          this.isUser1() ? this.user1ApprovedShows.set(response.user1ApprovedShows) : this.user2ApprovedShows.set(response.user2ApprovedShows);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Your selected shows have been submited.',
          });
        },
        error: (response) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.error.message,
            });
          },
      });
  }
}
