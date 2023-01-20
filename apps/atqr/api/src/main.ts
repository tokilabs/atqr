/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { PrismaService } from './app/infra/database/prisma.service';
import * as bodyParser from 'body-parser';

/**
 * Creates and starts the Nest app
 */
async function bootstrap() {
  const nestOptions: NestApplicationOptions = {
    bodyParser: false,
  };
  const app = await NestFactory.create(AppModule, nestOptions);

  // Attach raw body to Req when needed
  // This is needed for Stripe webhook signature verification
  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['stripe-signature']) {
      return;
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
