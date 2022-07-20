import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ChallengeController } from './challenge.controller';

import { PrismaService } from './infra/database/prisma.service';
import { Mailer } from './infra/email/mailer-sevice';
import { StripeService } from './infra/payment/stripe.service';
import { ChallengeRepository } from './repositories/challenge.repository';
import { PlayerRepository } from './repositories/player.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ChallengeController],
  providers: [
    PrismaService,
    ChallengeRepository,
    PlayerRepository,
    ConfigService,
    StripeService,
    Mailer,
  ],
})
export class AppModule {}
