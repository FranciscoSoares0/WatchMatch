import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-show-score',
  imports: [CommonModule],
  templateUrl: './show-score.component.html',
  styleUrl: './show-score.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowScoreComponent {
  score = input<number>(0);

  getScoreColor(score: number): string {
    if (score >= 7) return 'bg-emerald-400';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-red-400';
  }
}
