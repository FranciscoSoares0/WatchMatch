import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Matching } from '../interfaces/matching';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { RouterLink } from '@angular/router';
import { User } from '../../auth/interfaces/user';

@Component({
  selector: 'app-homepage-matching-carroussel',
  imports: [Carousel, ButtonModule, Tag, RouterLink],
  templateUrl: './homepage-matching-carroussel.component.html',
  styleUrl: './homepage-matching-carroussel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageMatchingCarrousselComponent {
  type = input<string>('Pending');
  user = input<User | null>(null);
  matchings = input<Matching[]>([]);
  loading = input<boolean>(true);

  responsiveOptions = signal<any[] | undefined>(
    [
      {
        breakpoint: '1600px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1200px',
        numVisible: 1,
        numScroll: 1,
      },
    ]
  );

  getFriendEmail(matching: Matching,user:User): string {
    const currentUserId = user._id;
    if (currentUserId)
      return matching.user1Id === currentUserId
        ? matching.user2Email
        : matching.user1Email;
    else return 'Unknown User';
  }

  getMatchingStatus(matching: any): string {
    return matching.status === 'pending' ? 'Pending' : 'Completed';
  }

}
