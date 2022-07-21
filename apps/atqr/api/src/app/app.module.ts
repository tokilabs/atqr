import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ChallengeController } from './challenge.controller';

import { PrismaService } from './infra/database/prisma.service';
import { Mailer } from './infra/email/mailer.service';

import { StripeService } from './infra/payment/stripe.service';
import { ChallengeRepository } from './repositories/challenge.repository';
import { PlayerRepository } from './repositories/player.repository';
import { Mailer } from './infra/email/mailer-sevice';
import { DeadlineMonitorService } from '../../../../../libs/atqr/domain/src/lib/services/deadlineMonitor.service';

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
    DeadlineMonitorService
  ],
})
export class AppModule {}
