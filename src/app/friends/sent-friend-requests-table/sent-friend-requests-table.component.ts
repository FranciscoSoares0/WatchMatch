import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FriendService } from '../services/friend.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-sent-friend-requests-table',
  imports: [TableModule,Message,Avatar],
  templateUrl: './sent-friend-requests-table.component.html',
  styleUrl: './sent-friend-requests-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentFriendRequestsTableComponent {
private readonly friendService = inject(FriendService);
  private readonly messageService = inject(MessageService);

  sentRequests = this.friendService.sentRequestsSig;

  ngOnInit(): void {
    this.friendService.getSentRequests().subscribe({
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      },
    });
  }
}
