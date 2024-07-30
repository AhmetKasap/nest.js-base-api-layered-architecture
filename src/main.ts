import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${process.env.NAME}/${process.env.VERSION}`);

  await app.listen(process.env.PORT || 5001);
}
bootstrap();