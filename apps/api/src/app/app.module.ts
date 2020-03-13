import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot(configuration().database)
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
