import { Component } from '@angular/core';
import { ForgotPasswordDialog, LoginDialog, ResetPasswordDialog } from '@wws/account/feature/shared/auth';
import { Dialog } from '@wws/common/ui/dialog';
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

  constructor(public dialog: Dialog) { }

  login() {
    this.login$ = this.dialog
      .openFromComponent(

        LoginDialog, { width: '300px' }

      ).afterClosed();
  }

  forgot() {
    this.forgot$ = this.dialog
      .openFromComponent(

        ForgotPasswordDialog,
        { width: '300px' }

      ).afterClosed()
      .pipe(
        tap((result) => {
          console.log(result);
          if (!!result) this.reset();
        }));
  }

  reset() {
    this.reset$ = this.dialog
      .openFromComponent(

        ResetPasswordDialog,
        { width: '300px' }

      ).afterClosed();
  }
}
