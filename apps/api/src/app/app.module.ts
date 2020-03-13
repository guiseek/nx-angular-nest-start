import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountFeatureApiModule } from '@wws/account/feature/api';
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
    AccountFeatureApiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
