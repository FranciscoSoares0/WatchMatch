import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FriendApiService } from '../services/friend-api.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { Avatar } from 'primeng/avatar';
import { FriendStateService } from '../services/friend-state.service';

@Component({
  selector: 'app-sent-friend-requests-table',
  imports: [TableModule,Message,Avatar],
  templateUrl: './sent-friend-requests-table.component.html',
  styleUrl: './sent-friend-requests-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentFriendRequestsTableComponent {
private readonly friendApiService = inject(FriendApiService);
private readonly friendStateService = inject(FriendStateService);
  private readonly messageService = inject(MessageService);

  sentRequests = this.friendStateService.sentRequestsSig;

  ngOnInit(): void {
    this.friendApiService.getSentRequests().subscribe({
      next: (requests) => {
        this.friendStateService.setSentRequests(requests);
      },
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
