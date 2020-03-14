import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordDialog, LoginDialog, LoginForm, RegisterForm, ResetPasswordDialog } from '@wws/account/shared/auth';
import { AuthService } from '@wws/account/shared/data-access';
import { ILogin, IRegister } from '@wws/api-interfaces';
import { Dialog } from '@wws/ui-kit';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'wws-account',
  templateUrl: './account.container.html',
  styleUrls: ['./account.container.scss']
})
export class AccountContainer {
  login$: Observable<any> = of(false);
  forgot$: Observable<any> = of(false);
  reset$: Observable<any> = of(false);

  flipped = false;
  tabs = [
    { name: 'login', label: 'Login', componentClass: LoginForm },
    { name: 'register', label: 'Register', componentClass: RegisterForm }
  ];

  constructor(
    public dialog: Dialog,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(data: ILogin) {
    console.log(data);
    this.auth.login(data)
      .subscribe(auth => {
        if (!!auth) {
          this.router.navigateByUrl('/');
        }
      })
  }
  onRegister(data: IRegister) {
    console.log(data);
    this.auth.register(data)
    .subscribe(auth => {
      console.log(auth);

      if (!!auth) {
        this.flipped = false;
        // this.router.navigateByUrl('/');
      }
    })

  }
  login() {
    this.login$ = this.dialog
      .openFromComponent(LoginDialog, { width: '300px' })
      .afterClosed();
  }

  forgot() {
    this.forgot$ = this.dialog
      .openFromComponent(ForgotPasswordDialog, { width: '300px' })
      .afterClosed()
      .pipe(
        tap(result => {
          console.log(result);
          if (!!result) this.reset();
        })
      );
  }

  reset() {
    this.reset$ = this.dialog
      .openFromComponent(ResetPasswordDialog, { width: '300px' })
      .afterClosed();
  }
}
