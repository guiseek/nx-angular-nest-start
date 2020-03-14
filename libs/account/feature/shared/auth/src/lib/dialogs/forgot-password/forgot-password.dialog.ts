import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@wws/account/feature/shared/data-access';
import { DialogRef } from '@wws/ui-kit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wws-auth-forgot-password',
  templateUrl: './forgot-password.dialog.html',
  styleUrls: ['./forgot-password.dialog.scss']
})
export class ForgotPasswordDialog implements OnDestroy {
  form: FormGroup;
  sub: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ref: DialogRef<ForgotPasswordDialog>
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      lastPassword: ['', [Validators.minLength(4)]]
    })
  }
  onCancel() {
    this.ref.close();
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.sub = this.authService
        .forgotPassword(this.form.value)
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
