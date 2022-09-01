import {
  Challenge,
  ChallengeStarted,
  ChallengeStatus,
  Congrats,
  EmailAddress,
  NotificationService,
  IChallengeRepository,
  IPlayerRepository,
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
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Guid } from '@tokilabs/lang';
import { CreateChallengeDto, UpdateCreditCardTokenDto } from './dtos';
import { UpdateChallengeDto } from './dtos/updateChallenge.dto';
import ValidationErrors, {
  ValidationErrorTypes,
} from './errors/validationError';
import { StripeService } from './infra';
import { Mailer } from './infra/email/mailer.service';

@Controller('challenge')
export class ChallengeController {
  constructor(
    private readonly emailService: Mailer,
    @Inject(IChallengeRepository)
    private readonly challengeRepository: IChallengeRepository,
    @Inject(IPlayerRepository)
    private readonly playerRepository: IPlayerRepository,
    private readonly paymentService: StripeService,
    private readonly notificationService: NotificationService
  ) {}

  @Post()
  async createChallenge(
    @Body() challengeDto: CreateChallengeDto
  ): Promise<Challenge> {
    try {
      let player = this.playerRepository.findByEmail(
        new EmailAddress(challengeDto.player.emailAddress.value)
      );

      if (!player) {
        player = new Player(
          challengeDto.player.name,
          new EmailAddress(challengeDto.player.emailAddress.value)
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
        const emailAddress = new EmailAddress(
          challengeDto.player.emailAddress.value
        );
        const email = new SupConfirmation(player, challenge);
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

  @Get('latest/:amount')
  latest(@Param('amount') amount: number) {
    return this.challengeRepository.findLastChallenges(amount);
  }

  @Patch(':id')
  async updateChallenge(
    @Param('id') id: Guid,
    @Body() dto: UpdateChallengeDto
  ): Promise<void> {
    switch (dto.valueOf()) {
      case dto.challengeStatus != undefined:
        return await this.updateStatus(id, dto.challengeStatus);
      case dto.updateCreditCard != undefined:
        return await this.changePayment(id, dto.updateCreditCard);
      case dto.updateSupervisor != undefined:
        return await this.changeSupervisor(id);
      default:
        console.log('algo de errado nãoe sta certo');
    }
  }
  private changeSupervisor(id: Guid): void {
    return;
  }

  // TODO Implement change payment endpoint and fix return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private changePayment(
    id: Guid,
    UpdateCreditCardTokenDto: UpdateCreditCardTokenDto
  ): void {
    return;
  }

 raquel/atqr-96-refactor-challenge-page


  private async updateStatus(id: Guid, status: ChallengeStatus): Promise<void> {
    try {
      const challenge = await this.challengeRepository.findUnique(id);
      challenge.updateOverdueStatus(status);
      this.challengeRepository.update(challenge);

      if (challenge.status == ChallengeStatus.Completed) {
        const email = new Congrats(challenge.player);
        this.emailService.sendMail(email);

 
 development
      } else {
        throw new Error('challenge not updated');
      }
    } catch (error) {
      throw new HttpException(
        "We don't know what happen'd",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
