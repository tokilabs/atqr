import { DeadlineMonitorService, NotificationService } from '@atqr/domain';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChallengeController } from './challenge.controller';
import { PrismaService } from './infra/database/prisma.service';
import { Mailer } from './infra/email/mailer.service';
import { StripeService } from './infra/payment/stripe.service';
import { ChallengeRepository, PlayerRepository } from './repositories';

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
