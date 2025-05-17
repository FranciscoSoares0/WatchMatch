import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPassword } from '../../interfaces/forgot-password';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule, InputTextModule,ButtonModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
  
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      const forgotPasswordData: ForgotPassword = {
        email: email!
      }
      this.authService.forgotPassword(forgotPasswordData).subscribe({
        next: (response) => {
          this.forgotPasswordForm.reset();
          this.forgotPasswordForm.clearValidators();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        },
      });
    }
    
  }
}
