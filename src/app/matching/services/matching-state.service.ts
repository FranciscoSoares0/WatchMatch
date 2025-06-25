import { Injectable, signal } from '@angular/core';
import { Matching } from '../interfaces/matching';

@Injectable({
  providedIn: 'root',
})
export class MatchingStateService {
  readonly pendingMatchingsSig = signal<Matching[]>([]);
  readonly completedMatchingsSig = signal<Matching[]>([]);

  setPendingMatchings(matchings: Matching[]) {
    this.pendingMatchingsSig.set(matchings);
  }

  addPendingMatching(matching: Matching) {
    this.pendingMatchingsSig.set([...this.pendingMatchingsSig(), matching]);
  }

  setCompletedMatchings(matchings: Matching[]) {
    this.completedMatchingsSig.set(matchings);
  }

  addCompletedMatching(matching: Matching) {
    this.completedMatchingsSig.set([...this.completedMatchingsSig(), matching]);
  }

  movePendingToCompleted(matchingId: string) {
    const pendingMatchings = this.pendingMatchingsSig();

    const matchingIndex = pendingMatchings.findIndex(
      (m) => m._id === matchingId
    );
    if (matchingIndex !== -1) {
      const matching = pendingMatchings[matchingIndex];
      this.pendingMatchingsSig.set(
        pendingMatchings.filter((m) => m._id !== matchingId)
      );
      this.completedMatchingsSig.set([
        ...this.completedMatchingsSig(),
        matching,
      ]);
    }
  }
}
