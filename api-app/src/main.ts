import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppDataSource } from '../data-source';

dotenv.config({ path: '../.env' });

async function bootstrap() {
  await AppDataSource.initialize();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setDescription("La description der l'api")
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
