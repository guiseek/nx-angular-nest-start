import { NgModule } from '@angular/core';
import { Database } from '@wws/common/util/browser';
import { SharedDataAccessModule } from '@wws/shared/data-access';
import { AuthGuard } from './guards';
import { CompanyService } from './services';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [SharedDataAccessModule],
  providers: [
    Database,
    AuthGuard,
    AuthService,
    UserService,
    CompanyService
  ]
})
export class AccountSharedDataAccessModule {}
