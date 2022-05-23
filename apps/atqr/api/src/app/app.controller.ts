import {
  Challenge,
  ChallengeStarted,
  EmailAddress,
  PaymentMethodEntity,
  PaymentMethodEnum,
  Player,
  SupConfirmation,
} from '@atqr/domain';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Mailer } from './infra/email/mailer-sevice';
import { AppService } from './app.service';

import { ChallengeRepository } from './repositories/challenge.repository';
import { PlayerRepository } from './repositories/player.repository';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly challengeRepository: ChallengeRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly emailService: Mailer
  ) {}
}
