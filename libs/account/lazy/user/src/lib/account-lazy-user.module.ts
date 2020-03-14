import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountSharedDataAccessModule } from '@wws/account/shared/data-access';
import { AccountSharedUserModule } from '@wws/account/shared/user';
import { UiKitModule } from '@wws/ui-kit';
import { UsersContainer } from './users/users.container';

@NgModule({
  imports: [
    CommonModule,
    UiKitModule,
    AccountSharedUserModule,
    AccountSharedDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersContainer
      }
    ])
  ],
  declarations: [UsersContainer]
})
export class AccountLazyUserModule {}
