import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountFeatureSharedDataAccessModule } from '@wws/account/feature/shared/data-access';
import { AccountFeatureSharedFormsModule } from '@wws/account/feature/shared/forms';
import { CommonUiTableModule } from '@wws/common/ui/table';
import { UsersContainer } from './users/users.container';

@NgModule({
  imports: [
    CommonModule,
    CommonUiTableModule,
    AccountFeatureSharedFormsModule,
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
