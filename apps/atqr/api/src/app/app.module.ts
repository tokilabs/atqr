import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infra/database/prisma.service';
import { StripeService } from './infra/payment/stripe.service';
import { ChallengeRepository } from './repositories/challenge.repository';
import { PlayerRepository } from './repositories/player.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    ChallengeRepository,
    PlayerRepository,
    ConfigService,
    StripeService,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
