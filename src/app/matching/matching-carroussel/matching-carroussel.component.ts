import { Component, input, output, signal } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Show } from '../interfaces/shows-response';
import { ShowScoreComponent } from '../show-score/show-score.component';

@Component({
  selector: 'app-matching-carroussel',
  imports: [Carousel, ButtonModule, CommonModule, Tag, ShowScoreComponent],
  templateUrl: './matching-carroussel.component.html',
  styleUrl: './matching-carroussel.component.css',
})
export class MatchingCarrousselComponent {
  shows = input<Show[]>([]);
  approvedShows = signal<Show[]>([]);
  rejectedShows = signal<Show[]>([]);

  approvedChange = output<Show[]>();
  rejectedChange = output<Show[]>();

  approveShow(show: Show) {
    if (!this.isShowApproved(show)) {
      const newApproved = [...this.approvedShows(), show];
      this.approvedShows.set(newApproved);
      this.approvedChange.emit(newApproved);
      if (this.isShowRejected(show)) {
        const newRejected = this.rejectedShows().filter(
          (rejectedShow) => rejectedShow.id !== show.id
        );
        this.rejectedShows.set(newRejected);
        this.rejectedChange.emit(newRejected);
      }
    }
  }

  rejectShow(show: Show) {
    if (!this.isShowRejected(show)) {
      const newRejected = [...this.rejectedShows(), show];
      this.rejectedShows.set(newRejected);
      this.rejectedChange.emit(newRejected);
      if (this.isShowApproved(show)) {
        const newApproved = this.approvedShows().filter(
          (approvedShow) => approvedShow.id !== show.id
        );
        this.approvedShows.set(newApproved);
        this.approvedChange.emit(newApproved);
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
}
