import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSuccessResponse, IForgotPassword, ILogin, IRegister, IResetPassword } from '@wws/api-interfaces';
import { Database } from '@wws/common/util/browser';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private db: Database, private http: HttpClient) { }

  login(credentials: ILogin) {
    return this.http
      .post('/api/auth/login', credentials)
      .pipe(
        map((response: AuthSuccessResponse) =>
          from(this.setSession(response))));
  }
  register(data: IRegister) {
    return this.http.post('/api/auth/register', data);
  }
  get token() {
    return window.localStorage.getItem('token');
  }

  setSession({ access_token, payload }) {
    window.localStorage.setItem('token', access_token);
    return this.db.put('auth', payload, 'payload');
  }
  clear() {
    window.localStorage.removeItem('token');
    return this.db.delete('auth', 'payload');
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

  signOut() {
    return this.clear();
  }
}
