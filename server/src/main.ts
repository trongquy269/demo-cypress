import 'dotenv/config'; // Load .env file FIRST before any other imports
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process?.env?.API_GLOBAL_PREFIX) {
    app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX);
  }

  // Enable cookie parser
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // domain cho phép
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // cho phép gửi cookie/token
  });

  await app.listen(process.env.API_PORT ?? 3001);
}
void bootstrap();
