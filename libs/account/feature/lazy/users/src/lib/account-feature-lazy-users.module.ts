import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountFeatureSharedDataAccessModule } from '@wws/account/feature/shared/data-access';
import { UsersContainer } from './users/users.container';

@NgModule({
  imports: [
    CommonModule,
    AccountFeatureSharedDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersContainer
      }
    ])
  ],
  declarations: [UsersContainer]
})
export class AccountFeatureLazyUsersModule {}
