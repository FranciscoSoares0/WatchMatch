import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { PasswordModule } from 'primeng/password';
import { PasswordValidator } from '../../validators/password-validator';
import { ConfirmPasswordValidator } from '../../validators/confirm-password-validator.ts';
import { ResetPassword } from '../../interfaces/reset-password';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, PasswordModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  private readonly resetToken = signal<string | null>(null);

  resetPasswordForm = this.fb.group(
    {
      newPassword: ['', [Validators.required, PasswordValidator()]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: ConfirmPasswordValidator('newPassword', 'confirmPassword') }
  );

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const resetToken = params['resetToken'];
      if (resetToken) this.resetToken.set(resetToken);
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid reset link.',
        });
        this.router.navigate(['/auth/forget-password']);
      }
    });
  }

  get passwordRules() {
    return this.resetPasswordForm.get('newPassword')?.errors?.[
      'passwordStrength'
    ];
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.resetToken()) {
      const { newPassword } = this.resetPasswordForm.value;

      const resetPasswordData: ResetPassword = {
        newPassword: newPassword!,
        resetToken: this.resetToken()!,
      };

      this.authService.resetPassword(resetPasswordData).subscribe({
        next: (response) => {
          this.router.navigate(['/auth/signin']);
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
}
