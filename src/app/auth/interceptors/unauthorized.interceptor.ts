import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean | null>(null);

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const http = inject(HttpClient);
  const messageService = inject(MessageService);

  const isAuthMeRequest = req.url.includes('/auth/me');
  const isRefreshRequest = req.url.includes('/auth/refresh');
  const isLoginRequest = req.url.includes('/auth/signin');

  return next(req).pipe(
    catchError((error) => {
      console.log(error)
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isRefreshRequest &&
        !isLoginRequest &&
        !isAuthMeRequest
      ) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return http.post('/auth/refresh', {}, { withCredentials: true }).pipe(
            switchMap(() => {
              refreshTokenSubject.next(true);
              return next(req.clone());
            }),
            catchError((err) => {
              messageService.add({
                severity: 'error',
                summary: 'Session Expired',
                detail: 'Please log in again.',
              });
              authService.logout();
              return throwError(() => err);
            }),
            finalize(() => {
              isRefreshing = false;
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter((result) => result === true),
            take(1),
            switchMap(() => next(req.clone()))
          );
        }
      }

      return throwError(() => error);
    })
  );
};

