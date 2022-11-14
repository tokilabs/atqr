import {
  DeadlineMonitorService,
  IChallengeRepository,
  IPlayerRepository,
  NotificationService,
} from '@atqr/domain';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChallengeController } from './challenge.controller';
import { Mailer, PrismaService, StripeService } from './infra';
import { ChallengeRepository, PlayerRepository } from './repositories';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ChallengeController],
  providers: [
    PrismaService,
    ConfigService,
    StripeService,
    Mailer,
    ChallengeRepository,
    PlayerRepository,
    {
      provide: IChallengeRepository,
      useClass: ChallengeRepository,
    },
    {
      provide: IPlayerRepository,
      useClass: PlayerRepository,
    },
    {
      provide: NotificationService,
      inject: [Mailer, ChallengeRepository],
      useFactory: (Mailer, ChallengeRepository) => {
        return new NotificationService(Mailer, ChallengeRepository);
      },
    },
    {
      provide: DeadlineMonitorService,
      inject: [NotificationService],
      useFactory: (NotificationService) => {
        return new DeadlineMonitorService(NotificationService);
      },
    },

  ],
})
export class AppModule {}
