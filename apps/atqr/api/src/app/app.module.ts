import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { ChallengeController } from './challenge.controller';
import { PrismaService } from './infra/database/prisma.service';
import { Mailer } from './infra/email/mailer-sevice';
import { StripeModule } from './infra/payment/stripe.module';
import { StripeService } from './infra/payment/stripe.service';
import { ChallengeRepository } from './repositories/challenge.repository';
import { PlayerRepository } from './repositories/player.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StripeModule],
  controllers: [ChallengeController],
  providers: [
    AppService,
    PrismaService,
    ChallengeRepository,
    PlayerRepository,
    ConfigService,
    StripeService,
    Mailer,
  ],
})
export class AppModule {}
