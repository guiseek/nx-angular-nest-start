import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountFeatureSharedAuthModule } from '@wws/account/feature/shared/auth';
import { AccountFeatureSharedDataAccessModule } from '@wws/account/feature/shared/data-access';
import { CommonUiDialogModule } from '@wws/common/ui/dialog';
import { AuthElementsModule } from '@wws/shared/auth/auth-elements';
import { AccountContainer } from './account/account.container';

@NgModule({
  imports: [
    CommonModule,
    AuthElementsModule,
    CommonUiDialogModule,
    AccountFeatureSharedDataAccessModule,
    AccountFeatureSharedAuthModule,
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
