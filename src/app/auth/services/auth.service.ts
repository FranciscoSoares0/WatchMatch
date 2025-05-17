import { inject, Injectable, signal } from '@angular/core';
import { UserSignIn } from '../interfaces/user-sign-in';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserSignUp, UserSignUpResponse } from '../interfaces/user-sign-up';
import { Router } from '@angular/router';
import {
  ForgotPassword,
  ForgotPasswordResponse,
} from '../interfaces/forgot-password';
import {
  ResetPassword,
  ResetPasswordResponse,
} from '../interfaces/reset-password';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  userSig = signal<User | null>(null);

  signin(signInData: UserSignIn): Observable<User> {
    return this.http
      .post<User>(`/auth/signin`, signInData, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          this.userSig.set(user);
        })
      );
  }

  signup(signUpData: UserSignUp): Observable<UserSignUpResponse> {
    return this.http.post<UserSignUpResponse>(`/auth/signup`, signUpData);
  }

  forgotPassword(
    forgotPasswordData: ForgotPassword
  ): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `/auth/forgot-password`,
      forgotPasswordData
    );
  }

  resetPassword(
    resetPasswordData: ResetPassword
  ): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>(
      `/auth/reset-password`,
      resetPasswordData
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>('/auth/me', { withCredentials: true });
  }

  logout() {
    this.http
      .post('/auth/signout', {}, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['auth/signin']);
      });
  }
}
