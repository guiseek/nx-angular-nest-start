import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyContainer } from './company/company.container';

@NgModule({
  imports: [
    CommonModule,

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
