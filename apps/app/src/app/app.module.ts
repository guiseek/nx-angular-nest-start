import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard, AuthService } from '@wws/account/shared/data-access';
import { Database, DATABASE_CONFIG } from '@wws/common/util/browser';
import { TokenInterceptor } from '@wws/common/util/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('@wws/account/lazy/auth').then(
              module => module.AccountLazyAuthModule
            )
        },
        {
          path: '',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('@wws/account/lazy/company').then(
              module => module.AccountLazyCompanyModule
            )
        }
        // {
        //   path: '',
        //   loadChildren: () =>
        //     import('@wws/account/lazy/user').then(
        //       module => module.AccountLazyUserModule
        //     )
        // },
        // {
        //   path: '',
        //   canActivate: [AuthGuard],
        //   loadChildren: () =>
        //     import('@wws/account/lazy/auth').then(
        //       module => module.AccountLazyAuthModule
        //     )
        // }
      ],
      { initialNavigation: true }
    )
  ],
  providers: [
    Database,
    AuthService,
    TokenInterceptor,
    {
      provide: DATABASE_CONFIG,
      useValue: {
        name: 'wws.web.app',
        version: 1,
        stores: { auth: { indexes: { id: { unique: true } } } }
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
