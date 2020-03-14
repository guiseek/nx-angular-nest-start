import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountApiAuthModule } from '@wws/account/api/auth';
import { AccountApiCompaniesModule } from '@wws/account/api/companies';
import { AccountApiUsersModule } from '@wws/account/api/users';
import configuration from '../config/configuration';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: environment.production ? '.env' : '.development.env'
    }),
    TypeOrmModule.forRoot(configuration().database),
    AccountApiAuthModule,
    AccountApiUsersModule,
    AccountApiCompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
