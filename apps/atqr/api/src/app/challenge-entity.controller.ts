import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Guid } from '@tokilabs/lang';

import { CreateChallengeDto } from './dtos/createChallenge.dto';
import { ChallengeRepository } from './repositories/challenge.repository';
import { PlayerRepository } from './repositories/player.repository';
import {
  Challenge,
  ChallengeStarted,
  EmailAddress,
  PaymentMethodEntity,
  PaymentMethodEnum,
  SupConfirmation,
} from '@atqr/domain';
import { Player } from '@atqr/domain';
import ValidationErrors, {
  ValidationErrorTypes,
} from './errors/validationErrors';
import { UpdateCreditCardTokenDto } from './dtos/updateCreditCardToken.dto';


// @POST new challenge

@Controller('challenge')
export class ChallengeController {
  emailService: any;
  constructor(
    //private readonly appService: AppService,
    private readonly challengeRepository: ChallengeRepository,
    private readonly playerRepository: PlayerRepository
  ) {}
  // @POST new challenge

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
          challengeDto.player,
          new EmailAddress(challengeDto.playerEmail)
        );
      }

      const challenge = new Challenge(
        challengeDto.goal,
        challengeDto.deadline,
        challengeDto.supervisorName,
        challengeDto.supervisorEmail,
        challengeDto.player,
        challengeDto.id,
        challengeDto.price,
        challengeDto.paymentMethod
      );

      if (challengeDto.creditCardToken) {
        const paymentMethod = new PaymentMethodEntity(
          PaymentMethodEnum.creditCard,
          'pagseguro',
          challengeDto.creditCardToken
        );

        // Verificar se o token do cartão tem limite para o desafio.(Faz uma cobrança e estorna)

        challenge.changePaymentMethod(paymentMethod);

        this.challengeRepository.create(challenge);

        const emailAddress = new EmailAddress(challengeDto.supervisorEmail);
        const email = new ChallengeStarted(player);
        this.emailService.sendMail(email);

        return challenge;
      } else {
        this.challengeRepository.create(challenge);

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

      //Pegar os erros e resolver. (Usar try catch)
    }
  }

  // @GET last challenges
  @Get()
  getLastChallenges(challengeRepository: ChallengeRepository, id: Guid) {
    return challengeRepository.findLastChallenges;
  }

  // @GET certain challenge to change payment method

  @Get('challenge/:id')
  changePayment(@Param('id') id: string): Challenge {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }

  @Patch('challenge/:id')
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateCreditCardTokenDto: UpdateCreditCardTokenDto
  ): Promise<Challenge> {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }

  // @GET certain challenge to change supervisor

  @Get('challenge/:id')
  changeSupervisor(@Param('id') id: string): Challenge {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }
}