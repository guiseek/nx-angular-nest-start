import { NgModule } from '@angular/core';
import { Database } from '@wws/common/util/browser';
import { SharedDataAccessModule } from '@wws/shared/data-access';
import { AuthGuard } from './guards';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [SharedDataAccessModule],
  providers: [
    Database,
    AuthGuard,
    AuthService,
    UserService
    // {
    //   provide: DATABASE_CONFIG,
    //   useValue: {
    //     name: 'wws.web.app',
    //     version: 1,
    //     stores: { auth: { indexes: { access_token: { unique: true } } } }
    //   }
    // }
  ]
})
export class AccountSharedDataAccessModule {}
