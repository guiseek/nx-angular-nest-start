import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthService } from '@wws/account/feature/shared/data-access';
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
          path: '',
          loadChildren: () =>
            import('@wws/account/feature/lazy/users').then(
              module => module.AccountFeatureLazyUsersModule
            )
        },
        {
          path: 'account',
          loadChildren: () =>
            import('@wws/account/feature/lazy/account').then(
              module => module.AccountFeatureLazyAccountModule
            )
        }
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
export class AppModule {}
