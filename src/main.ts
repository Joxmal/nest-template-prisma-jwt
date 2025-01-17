import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))

  await app.listen(process.env.PORT);

  console.log(`Server listening on port ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
}
bootstrap();
