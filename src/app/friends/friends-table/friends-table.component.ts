import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { FriendApiService } from '../services/friend-api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FriendStateService } from '../services/friend-state.service';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-friends-table',
  imports: [TableModule, ButtonModule, AvatarModule, ConfirmDialog, SkeletonLoaderComponent, RouterLink],
  templateUrl: './friends-table.component.html',
  styleUrl: './friends-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class FriendsTableComponent implements OnInit {
  private readonly friendApiService = inject(FriendApiService);
  private readonly friendStateService = inject(FriendStateService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  friends = this.friendStateService.friendsSig;
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.friendApiService.getUserFriends().subscribe({
      next: (friends) => {
        this.loading.set(false);
        this.friendStateService.setFriends(friends);
      },
      error: (err) => {
        this.loading.set(false);
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
        size: 'small',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Remove Friend',
        size: 'small',
        severity: 'danger',
      },

      accept: () => {
        this.RemoveFriend(friendId);
      },
      reject: () => {},
    });
  }

  RemoveFriend(friendId: string) {
    this.friendApiService.removeFriend(friendId).subscribe({
      next: (response) => {
        this.friendStateService.removeFriend(friendId);
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
