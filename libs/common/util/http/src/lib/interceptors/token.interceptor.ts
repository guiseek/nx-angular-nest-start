import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@wws/account/shared/data-access';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.token;
    if (token) request = this.getCloneRequestWithToken(request, token);

    return next.handle(request).pipe(
      catchError(err => {
        return this.catchTokenError(err);
      })
    );
  }

  getCloneRequestWithToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  catchTokenError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        console.log('clear');

        this.auth.clear();
      }
    }
    return throwError(err);
  }
}
