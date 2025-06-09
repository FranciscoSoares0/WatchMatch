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
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { ShowScoreComponent } from '../show-score/show-score.component';
import { CarousselSkeletonLoaderComponent } from '../caroussel-skeleton-loader/caroussel-skeleton-loader.component';

@Component({
  selector: 'app-matching-selection',
  imports: [Carousel, ButtonModule, CommonModule, Tag, ShowScoreComponent, CarousselSkeletonLoaderComponent],
  templateUrl: './matching-selection.component.html',
  styleUrl: './matching-selection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingSelectionComponent implements OnInit {
  private readonly matchingApiService = inject(MatchingApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);

  matching = signal<Matching | null>(null);
  shows = signal<Show[]>([]);
  approvedShows = signal<Show[]>([]);
  rejectedShows = signal<Show[]>([]);

  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const matchingId = params.get('matchingId');
      if (matchingId)
        this.matchingApiService.getMatchingById(matchingId).subscribe({
          next: (response) => {
            if (response) {
              console.log('Matching data:', response);
              this.loading.set(false);
              this.matching.set(response);
              if (response.shows) this.shows.set(response.shows);
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

  approveShow(show: Show) {
    if (!this.isShowApproved(show)) {
      this.approvedShows.update((approvedShows) => [...approvedShows, show]);
      if (this.isShowRejected(show)) {
        this.rejectedShows.update((rejectedShows) =>
          rejectedShows.filter((rejectedShow) => rejectedShow.id !== show.id)
        );
      }
    }
  }

  rejectShow(show: Show) {
    if (!this.isShowRejected(show)) {
      this.rejectedShows.update((rejectedShows) => [...rejectedShows, show]);
      if (this.isShowApproved(show)) {
        this.approvedShows.update((approvedShows) =>
          approvedShows.filter((approvedShow) => approvedShow.id !== show.id)
        );
      }
    }
  }

  isShowApproved(show: Show): boolean {
    return this.approvedShows().some(
      (approvedShow) => approvedShow.id === show.id
    );
  }

  isShowRejected(show: Show): boolean {
    return this.rejectedShows().some((rejectShow) => rejectShow.id === show.id);
  }

  isSubmissionDisabled(): boolean {
    const total = this.shows().length;
    const approved = this.approvedShows().length;
    const rejected = this.rejectedShows().length;
    return approved + rejected < total;
  }
}
