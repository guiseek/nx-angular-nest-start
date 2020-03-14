import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompaniesModule,
  ],
  controllers: [
    AccountController
  ],
  exports: [
    AuthModule,
    UsersModule,
  ]
})
export class AccountFeatureApiModule {

}
