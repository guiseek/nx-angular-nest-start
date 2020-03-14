import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordDialog } from './dialogs/forgot-password/forgot-password.dialog';
import { LoginDialog } from './dialogs/login/login.dialog';
import { ResetPasswordDialog } from './dialogs/reset-password/reset-password.dialog';
import { LoginForm } from './forms/login/login.form';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LoginDialog, ForgotPasswordDialog, ResetPasswordDialog, LoginForm],
  exports: [LoginDialog, ForgotPasswordDialog, ResetPasswordDialog, LoginForm]
})
export class AccountSharedAuthModule {}
