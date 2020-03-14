/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.port || 3333;

  const options = new DocumentBuilder()
    .setTitle('WWS')
    .setDescription('Workspace Angular NestJS Start Template')
    .setVersion('1.0')
    .addTag('nx')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
