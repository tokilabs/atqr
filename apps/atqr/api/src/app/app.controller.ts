import {
  Challenge,
  ChallengeStarted,
  EmailAddress,
  EmailService,
  PaymentMethodEntity,
  PaymentMethodEnum,
  Player,
  SupConfirmation,
} from '@atqr/domain';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateChallengeDto } from './dtos/createChallenge.dto';
import { UpdateCreditCardTokenDto } from './dtos/updateCreditCardToken.dto';
import { ChallengeRepository } from './repositories/challenge.repository';
import { PlayerRepository } from './repositories/player.repository';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly challengeRepository: ChallengeRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly emailService: EmailService
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
        player = new Player(challengeDto.playerName, challengeDto.playerEmail);
      }

      const challenge = new Challenge(
        challengeDto.goal,
        challengeDto.deadline,
        challengeDto.price,
        challengeDto.supervisorName,
        challengeDto.supervisorEmail,
        player
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
        const email = new ChallengeStarted(emailAddress);
        this.emailService.sendMail(email);

        return challenge;
      } else {
        this.challengeRepository.create(challenge);

        const emailAddress = new EmailAddress(challengeDto.playerEmail);
        const email = new SupConfirmation(emailAddress);
        this.emailService.sendMail(email);
      }
    } catch (error) {
      //Pegar os erros e resolver. (Usar try catch)
    }
  }

  @Get('challenge/:id')
  getChallenge(@Param('id') id: string): Challenge {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }

  @Patch('challenge/:id')
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateCreditCardTokenDto: UpdateCreditCardTokenDto
  ): Promise<Challenge> {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }
}
function then(arg0: (result: any) => void) {
  throw new Error('Function not implemented.');
}
