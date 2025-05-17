import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserSignIn } from '../../interfaces/user-sign-in';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    RouterLink,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const error = params['error'];
      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Authentication Error',
          detail: decodeURIComponent(error),
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const signInData: UserSignIn = {
        email: email!,
        password: password!,
      };

      this.authService.signin(signInData).subscribe({
        next: (user) => {
          this.router.navigate(['/']);
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

  SignInWithGoogle() {
    window.location.href = `${environment.API_BASE_URL}/auth/google`;
  }
}
