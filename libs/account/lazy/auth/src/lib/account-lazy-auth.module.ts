import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountSharedAuthModule } from '@wws/account/shared/auth';
import { AccountSharedDataAccessModule } from '@wws/account/shared/data-access';
import { UiKitModule } from '@wws/ui-kit';
import { AccountContainer } from './account/account.container';

@NgModule({
  imports: [
    CommonModule,
    UiKitModule,
    AccountSharedDataAccessModule,
    AccountSharedAuthModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountContainer
      },
      {
        path: 'company',
        loadChildren: () =>
          import('@wws/account/lazy/company').then(
            module => module.AccountLazyCompanyModule
          )
      }
    ])
  ],
  declarations: [AccountContainer]
})
export class AccountLazyAuthModule {}
