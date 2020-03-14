import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordDialog, LoginDialog, ResetPasswordDialog } from '@wws/account/shared/auth';
import { AuthService } from '@wws/account/shared/data-access';
import { ILogin } from '@wws/api-interfaces';
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
