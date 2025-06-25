import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Show } from '../interfaces/shows-response';
import { Matching } from '../interfaces/matching';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-matching-results',
  imports: [TableModule, CommonModule],
  templateUrl: './matching-results.component.html',
  styleUrl: './matching-results.component.css',
})
export class MatchingResultsComponent {
  private readonly authService = inject(AuthService);

  user = this.authService.userSig();
  matching = input<Matching | null>(null);

  isShowApprovedByUser1(show: Show): boolean {
    return (
      this.matching()?.user1ApprovedShows.some(
        (approvedShow) => approvedShow.id === show.id
      ) || false
    );
  }

  isShowApprovedByUser2(show: Show): boolean {
    return (
      this.matching()?.user2ApprovedShows.some(
        (approvedShow) => approvedShow.id === show.id
      ) || false
    );
  }

  getUserLabel(email?: string): string {
    if (!email || !this.user?.email) return 'Friend';
    return this.user.email === email ? 'Me' : 'Friend';
  }
  
  isMatch(show: Show): boolean {
    return this.isShowApprovedByUser1(show) && this.isShowApprovedByUser2(show);
  }
}
