import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountFeatureSharedDataAccessModule } from '@wws/account/feature/shared/data-access';
import { AuthElementsModule } from '@wws/shared/auth/auth-elements';
import { AccountContainer } from './account/account.container';

@NgModule({
  imports: [
    CommonModule,
    AuthElementsModule,
    AccountFeatureSharedDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountContainer
      }
    ])
  ],
  declarations: [AccountContainer]
})
export class AccountFeatureLazyAccountModule {}
