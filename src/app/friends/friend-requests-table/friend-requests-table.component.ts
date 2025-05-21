import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FriendApiService,
} from '../services/friend-api.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RespondRequest } from '../interfaces/respond-request';
import { Avatar } from 'primeng/avatar';
import { FriendStateService } from '../services/friend-state.service';

@Component({
  selector: 'app-friend-requests-table',
  imports: [TableModule, ButtonModule, Avatar],
  templateUrl: './friend-requests-table.component.html',
  styleUrl: './friend-requests-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendRequestsTableComponent {
  private readonly friendStateService = inject(FriendStateService);
  private readonly friendApiService = inject(FriendApiService);
  private readonly messageService = inject(MessageService);

  requests = this.friendStateService.friendRequestsSig;

  ngOnInit(): void {
    this.friendApiService.getFriendRequests().subscribe({
      next: (requests) => {
        this.friendStateService.setFriendRequests(requests);
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

  RespondRequest(requestorId: string, respondRequestData: RespondRequest) {
    this.friendApiService
      .respondToFriendRequest(requestorId, respondRequestData)
      .subscribe({
        next: (response) => {
          this.friendStateService.respondRequest(requestorId, respondRequestData,response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        },
      });
  }
}
