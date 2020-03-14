import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthSuccessResponse,
  IForgotPassword,
  ILogin,
  IResetPassword
} from '@wws/api-interfaces';
import { Database } from '@wws/common/util/browser';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private db: Database, private http: HttpClient) {}

  login(credentials: ILogin) {
    return this.http
      .post('/api/auth/login', credentials)
      .pipe(tap((response: AuthSuccessResponse) => this.setSession(response)));
  }

  get token() {
    return window.localStorage.getItem('token');
  }

  setSession({ access_token, payload }) {
    this.db.put('auth', payload, 'payload');
    window.localStorage.setItem('token', access_token);
  }
  clear() {
    window.localStorage.removeItem('token');
    this.db.delete('auth', 'payload');
  }

  profile() {
    return this.http.get('/api/profile');
  }

  forgotPassword(credentials: IForgotPassword) {
    return this.http.post('/api/forgot-password', credentials);
  }

  resetPassword(credentials: IResetPassword) {
    return this.http.post('/api/reset-password', credentials);
  }
}
