import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountFeatureSharedAuthModule } from '@wws/account/feature/shared/auth';
import { AccountFeatureSharedDataAccessModule } from '@wws/account/feature/shared/data-access';
import { UiKitModule } from '@wws/ui-kit';
import { AccountContainer } from './account/account.container';

@NgModule({
  imports: [
    CommonModule,
    UiKitModule,
    AccountFeatureSharedDataAccessModule,
    AccountFeatureSharedAuthModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountContainer
      },
      {
        path: 'company',
        loadChildren: () =>
          import('@wws/account/feature/lazy/company').then(
            module => module.AccountFeatureLazyCompanyModule
          )
      }
    ])
  ],
  declarations: [AccountContainer]
})
export class AccountFeatureLazyAccountModule {}
