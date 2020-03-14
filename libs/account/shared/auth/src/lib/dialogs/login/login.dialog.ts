import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@wws/account/shared/data-access';
import { DialogRef, DIALOG_DATA } from '@wws/ui-kit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wws-auth-login',
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss']
})
export class LoginDialog implements OnDestroy {
  form: FormGroup;
  sub: Subscription;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private ref: DialogRef<LoginDialog>,
    @Inject(DIALOG_DATA) public data
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  onCancel() {
    this.ref.close();
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.sub = this.auth
        .login(this.form.value)
        .subscribe(result => this.ref.close(result));
    }
  }
  ngOnDestroy() {
    return !!this.sub && this.sub.unsubscribe();
  }
}
