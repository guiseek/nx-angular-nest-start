import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordDialog } from './dialogs/forgot-password/forgot-password.dialog';
import { LoginDialog } from './dialogs/login/login.dialog';
import { ResetPasswordDialog } from './dialogs/reset-password/reset-password.dialog';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LoginDialog, ForgotPasswordDialog, ResetPasswordDialog],
  exports: [LoginDialog, ForgotPasswordDialog, ResetPasswordDialog]
})
export class AccountFeatureSharedAuthModule {}
