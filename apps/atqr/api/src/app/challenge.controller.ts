import {
  Challenge,
  ChallengeStarted,
  ChallengeStatus,
  Congrats,
  EmailAddress,
  PaymentMethodEntity,
  PayThePrice,
  Player,
  SupConfirmation,
} from '@atqr/domain';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Guid } from '@tokilabs/lang';

import { CreateChallengeDto, UpdateCreditCardTokenDto } from './dtos';
import ValidationErrors, {
  ValidationErrorTypes,
} from './errors/validationError';
import { StripeService } from './infra';
import { Mailer } from './infra/email/mailer.service';
import { ChallengeRepository, PlayerRepository } from './repositories';

@Controller('challenge')
export class ChallengeController {
  constructor(
    private readonly emailService: Mailer,
    private readonly challengeRepository: ChallengeRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly paymentService: StripeService
  ) {}

  @Post('challenge')
  async createChallenge(
    @Body() challengeDto: CreateChallengeDto
  ): Promise<Challenge> {
    try {
      let player = this.playerRepository.findByEmail(
        new EmailAddress(challengeDto.playerEmail)
      );

      if (!player) {
        player = new Player(
          challengeDto.player.name,
          new EmailAddress(challengeDto.playerEmail)
        );

        this.playerRepository.create(player);
      }

      const challenge = new Challenge(
        challengeDto.goal,
        challengeDto.supervisorName,
        challengeDto.supervisorEmail,
        player,
        challengeDto.price,
        challengeDto.deadline,
        null // paymentMethod
      );

      // TODO: paramos aqui!

      if (challengeDto.paymentMethod) {
        const paymentMethod = new PaymentMethodEntity(
          challengeDto.paymentMethod.method,
          challengeDto.paymentMethod.paymentService,
          challengeDto.paymentMethod.token
        );

        // TODO Verificar se o token do cartão tem limite para o desafio.(Faz uma cobrança e estorna)

        challenge.changePaymentMethod(paymentMethod);

        this.challengeRepository.create(challenge);

        // TODO Finalize implementation
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const emailAddress = new EmailAddress(challengeDto.supervisorEmail);
        const email = new ChallengeStarted(player);
        this.emailService.sendMail(email);

        return challenge;
      } else {
        this.challengeRepository.create(challenge);

        // TODO Finalize implementation
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const emailAddress = new EmailAddress(challengeDto.playerEmail);
        const email = new SupConfirmation(player);
        this.emailService.sendMail(email);
      }
    } catch (error) {
      if (error instanceof ValidationErrors) {
        switch (error.type) {
          case ValidationErrorTypes.InvalidValue:
            throw new HttpException(error, HttpStatus.BAD_REQUEST);

          default:
            throw new HttpException(
              { message: "We don't know what happen'd", error },
              HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
      }

      // TODO Handle other errors
    }
  }

  @Get('last-challenges')
  getLastChallenges(amount: number) {
    return this.challengeRepository.findLastChallenges(amount);
  }

  @Patch('challenge/:id/')
  async updateStatus(
    @Param('id') id: Guid,
    @Body() status: ChallengeStatus
  ): Promise<void> {
    try {
      const challenge = await this.challengeRepository.findUnique(id);
      challenge.updateStatus(status);
      this.challengeRepository.update(challenge);

      if(challenge.status == ChallengeStatus.Completed){
        const email = new Congrats(challenge.player)
        this.emailService.sendMail(email);
      }
      else{
        const email = new PayThePrice(challenge.player)
        this.emailService.sendMail(email);

        this.paymentService.chargeCard(challenge.player)
      }
    } catch (error) {
      if (error instanceof ValidationErrors) {
        throw new HttpException(
          { message: "We don't know what happen'd", error },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
  @Get('challenge/:id')
  // TODO Implement change payment endpoint and fix return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePayment(@Param('id') id: string): Challenge {
    return {} as Challenge;
  }

  // TODO Implement update challenge endpoint and fix return
  @Patch('challenge/:id')
  async updateChallenge(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() updateCreditCardTokenDto: UpdateCreditCardTokenDto
  ): Promise<Challenge> {
    return {} as Challenge;
  }
  // TODO Implement change supervisor endpoint and fix return
  @Get('challenge/:id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeSupervisor(@Param('id') id: string): Challenge {
    return {} as Challenge;
  }
}
