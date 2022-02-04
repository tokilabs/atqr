import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infra/database/prisma.service';
import { ChallengeRepository } from './repositories/challenge.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, PrismaService, ChallengeRepository],
})
export class AppModule {}
