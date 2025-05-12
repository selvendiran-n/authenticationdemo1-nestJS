import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initDB } from './db/db.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await initDB(configService); // Initialize DB connection
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
