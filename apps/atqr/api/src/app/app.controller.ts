import {
  Challenge,
  ChallengeStarted,
  EmailAddress,
  EmailService,
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
    @Body() createChallenge: CreateChallengeDto
  ): Promise<Challenge> {
      const challenge = new Challenge()
    try {
      if (createChallenge.creditCardToken) {
        //Verificar se o token do cartão tem limite para o desafio.(Faz uma cobrança e estorna)
        const emailAddress = new EmailAddress(createChallenge.supervisorEmail);
        const email = new ChallengeStarted(emailAddress);
        this.emailService.sendMail(email);
      } else {
        const emailAddress = new EmailAddress(createChallenge.playerEmail);
        const email = new SupConfirmation(emailAddress);
        this.emailService.sendMail(email);
      }

      //Salvar os dados no banco de dados.
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
