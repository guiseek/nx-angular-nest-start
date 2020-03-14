import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountSharedAuthModule } from '@wws/account/shared/auth';
import { UiKitModule } from '@wws/ui-kit';
import { CompanyContainer } from './company/company.container';

@NgModule({
  imports: [
    CommonModule,
    UiKitModule,
    AccountSharedAuthModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyContainer
      }
    ])
  ],
  declarations: [CompanyContainer]
})
export class AccountLazyCompanyModule {}
