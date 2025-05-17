import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {
  catchError,
  filter,
  switchMap,
  take,
  finalize,
} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable()
export class UnathorizedInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !req.url.includes('/auth/refresh')
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(false);

      return this.http
        .post('/api/auth/refresh', {}, { withCredentials: true })
        .pipe(
          switchMap(() => {
            this.refreshTokenSubject.next(true);
            return next.handle(req.clone()); // Retry original request
          }),
          catchError((err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Session Expired',
              detail: 'Please log in again.',
            });
            this.authService.logout();
            return throwError(() => err);
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((refreshed) => refreshed === true),
        take(1),
        switchMap(() => next.handle(req.clone()))
      );
    }
  }
}
