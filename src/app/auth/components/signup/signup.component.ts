import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { PasswordValidator } from '../../validators/password-validator';
import { ConfirmPasswordValidator } from '../../validators/confirm-password-validator.ts';
import { UserSignUp } from '../../interfaces/user-sign-up';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  signupForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidator()]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: ConfirmPasswordValidator('password', 'confirmPassword') }
  );

  get passwordRules() {
    return this.signupForm.get('password')?.errors?.['passwordStrength'];
  }

  onSubmit() {
    if (this.signupForm.valid) {

      const { name, email, password } = this.signupForm.value;

      const signUpData: UserSignUp = {
        name: name!,
        email: email!,
        password: password!,
      }

      this.authService.signup(signUpData).subscribe({
        next: (response) => {
          this.router.navigate(['/auth/signin']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        },
      });

    }
  }

  SignInWithGoogle() {
      window.location.href = `${environment.API_BASE_URL}/auth/google`;
  }
}
