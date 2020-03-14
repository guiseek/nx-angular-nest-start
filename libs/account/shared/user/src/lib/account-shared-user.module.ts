import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyForm } from './companies/create-company/create-company.form';
import { CreateUserForm } from './users/create-user/create-user.form';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CreateUserForm, CreateCompanyForm],
  exports: [CreateUserForm, CreateCompanyForm]
})
export class AccountSharedUserModule {}
