import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountSharedAuthModule } from '@wws/account/shared/auth';
import { AccountSharedDataAccessModule } from '@wws/account/shared/data-access';
import { UiKitModule } from '@wws/ui-kit';
import { CompanyContainer } from './company/company.container';

@NgModule({
  imports: [
    CommonModule,
    UiKitModule,
    ReactiveFormsModule,
    AccountSharedAuthModule,
    AccountSharedDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyContainer
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@wws/account/lazy/user')
            .then(m => m.AccountLazyUserModule)
      }
    ])
  ],
  declarations: [CompanyContainer]
})
export class AccountLazyCompanyModule { }
