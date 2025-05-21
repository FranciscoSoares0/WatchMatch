import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SendFriendRequest } from '../interfaces/send-friend-request';
import { FriendApiService } from '../services/friend-api.service';
import { FriendStateService } from '../services/friend-state.service';

@Component({
  selector: 'app-add-friend-form',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './add-friend-form.component.html',
  styleUrl: './add-friend-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFriendFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly friendApiService = inject(FriendApiService);
  private readonly friendStateService = inject(FriendStateService);
  private readonly messageService = inject(MessageService);

  sendFriendRequestForm = this.fb.group({
    friendEmail: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.sendFriendRequestForm.valid) {
      const { friendEmail } = this.sendFriendRequestForm.value;
      const addFriendData: SendFriendRequest = {
        friendEmail: friendEmail!,
      };

      this.friendApiService.sendFriendRequest(addFriendData).subscribe({
        next: (response) => {
          this.friendStateService.addSentRequest(response.friendship);
          this.sendFriendRequestForm.reset();
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
}
