import { DeadlineMonitorService, NotificationService } from '@atqr/domain';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ChallengeController } from './challenge.controller';
import { HttpExceptionFilter } from './filter/httpExceptions.filter';
import { Mailer, PrismaService, StripeService } from './infra';
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
    {provide: APP_FILTER,
    useClass: HttpExceptionFilter},
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
