import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { FriendService } from '../services/friend.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-friends-table',
  imports: [TableModule, ButtonModule, AvatarModule, ConfirmDialog],
  templateUrl: './friends-table.component.html',
  styleUrl: './friends-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class FriendsTableComponent implements OnInit {
  private readonly friendService = inject(FriendService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  friends = this.friendService.friendsSig;

  ngOnInit(): void {
    this.friendService.getUserFriends().subscribe({
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      },
    });
  }

  RemoveFriendConfirmDialog(friendId:string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to remove this friend?',
      header: 'Remove Friend',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Remove Friend',
        severity: 'danger',
      },

      accept: () => {
        this.RemoveFriend(friendId);
      },
      reject: () => {},
    });
  }

  RemoveFriend(friendId: string) {
    this.friendService.removeFriend(friendId).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
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
