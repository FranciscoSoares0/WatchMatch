import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HomepageMatchingCarrousselComponent } from '../../../matching/homepage-matching-carroussel/homepage-matching-carroussel.component';
import { MatchingApiService } from '../../../matching/services/matching-api.service';
import { MatchingStateService } from '../../../matching/services/matching-state.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-homepagedisplay',
  imports: [HomepageMatchingCarrousselComponent],
  templateUrl: './homepagedisplay.component.html',
  styleUrl: './homepagedisplay.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageDisplayComponent implements OnInit {
  private readonly matchingApiService = inject(MatchingApiService);
  private readonly matchingStateService = inject(MatchingStateService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  pendingMatchings = this.matchingStateService.pendingMatchingsSig;
  completedMatchings = this.matchingStateService.completedMatchingsSig;
  user = this.authService.userSig;

  pendingMatchingsLoading = signal<boolean>(true);
  completedMatchingsLoading = signal<boolean>(true);

  ngOnInit() {
    forkJoin([
      this.matchingApiService.getPendingMatchings(),
      this.matchingApiService.getCompletedMatchings(),
    ])
      .subscribe({
        next: ([pending, completed]) => {
          this.matchingStateService.setPendingMatchings(pending);
          this.matchingStateService.setCompletedMatchings(completed);
          this.pendingMatchingsLoading.set(false);
          this.completedMatchingsLoading.set(false);
        },
        error: (err) => {
          this.pendingMatchingsLoading.set(false);
          this.completedMatchingsLoading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'An error occurred',
          });
        },
      });
  }
}
