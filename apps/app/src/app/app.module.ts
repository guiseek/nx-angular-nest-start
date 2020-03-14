import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
