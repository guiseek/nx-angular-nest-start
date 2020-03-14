import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@wws/account/feature/shared/data-access';
import { IForgotPasswordResponse } from '@wws/api-interfaces';
import { DialogRef, DIALOG_DATA } from '@wws/ui-kit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wws-auth-reset-password',
  templateUrl: './reset-password.dialog.html',
  styleUrls: ['./reset-password.dialog.scss']
})
export class ResetPasswordDialog implements OnInit, OnDestroy{
  form: FormGroup;
  sub: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ref: DialogRef<ResetPasswordDialog>,
    @Inject(DIALOG_DATA) public data: IForgotPasswordResponse
  ) {
    this.form = this.formBuilder.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }
  ngOnInit(): void {

    if (!!this.data) {
      const { resetPassword } = this.data;
      this.form.patchValue(resetPassword);
    }
  }
  onCancel() {
    this.ref.close();
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.sub = this.authService
        .resetPassword(this.form.value)
        .subscribe((result) => {
          console.log(result);

          this.ref.close(result);
        })

    }
  }

  ngOnDestroy() {
    return !!this.sub && this.sub.unsubscribe();
  }
}
