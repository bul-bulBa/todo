import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  // app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))
  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )
 
  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true
  }) 

  await app.listen(config.getOrThrow<number>('PORT') ?? 3000);
}
bootstrap();
