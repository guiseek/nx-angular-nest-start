import { NgModule } from '@angular/core';
import { SharedDataAccessModule } from '@wws/shared/data-access';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [SharedDataAccessModule],
  providers: [AuthService, UserService]
})
export class AccountFeatureSharedDataAccessModule {}
