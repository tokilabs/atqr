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
  Player,
  SupConfirmation,
  SupervisorEnum,
  DeadLineEmail,
  PayThePrice,
  SupervisorDenied,
  SupervisorAccepted,
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
import { UpdateSupervisorDto } from './dtos/updateSupervisor.dto';
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
      let player = await this.playerRepository.findByEmail(
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
        const email = new ChallengeStarted(player.emailAddress);
        this.emailService.sendMail(email);

        return challenge;
      } else {
        this.challengeRepository.create(challenge);

        // TODO Finalize implementation
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const emailAddress = new EmailAddress(
          challengeDto.player.emailAddress.value
        );
        const email = new SupConfirmation(player.emailAddress);
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
  // TODO: implement
  // @Get('challenge/:id')

  @Get('latest/:amount')
  latest(@Param('amount') amount: string) {
    return this.challengeRepository.findLastChallenges(parseInt(amount));
  }

  @Patch(':id/supervisor')
  async updateSupervisor(
    @Param('id') id: Guid,
    @Body() updateSupervisorDto: UpdateSupervisorDto
  ): Promise<void> {
    const challenge: Challenge = await this.challengeRepository.findUnique(id);
    switch (updateSupervisorDto.supervisorStatus) {
      case SupervisorEnum.accepted:
        this.emailService.sendMail(
          new SupervisorAccepted(challenge.player.emailAddress)
        );
        4;
        challenge.changeSupervisor(
          updateSupervisorDto.supervisorName,
          updateSupervisorDto.supervisorEmail
        );
        break;

      case SupervisorEnum.rejected:
        this.emailService.sendMail(
          new SupervisorDenied(challenge.player.emailAddress)
        );
        break;

      case SupervisorEnum.askedIfTheGoalIsAccomplished:
        this.emailService.sendMail(
          new DeadLineEmail(challenge.supervisorEmail)
        ); // change to sup email
        break;

      case SupervisorEnum.repliedIfTheGoalWasAccomplished:
        this.emailService.sendMail(new Congrats(challenge.player.emailAddress));
        this.updateStatus(id, ChallengeStatus.Completed);
        break;

      case SupervisorEnum.repliedIfTheGoalWasNotAccomplished:
        this.emailService.sendMail(
          new PayThePrice(challenge.player.emailAddress)
        );
        this.updateStatus(id, ChallengeStatus.Failed);
        break;
    }
    challenge.updateSupervisorStatus(updateSupervisorDto.supervisorStatus);
    this.challengeRepository.update(challenge);
  }

  // TODO Implement change payment endpoint and fix return

  @Patch(':id/payment')
  changePayment(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id') id: Guid,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() updateCreditCardTokenDto: UpdateCreditCardTokenDto
  ): void {
    return;
  }
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: Guid,
    @Body() status: ChallengeStatus
  ): Promise<void> {
    try {
      const challenge = await this.challengeRepository.findUnique(id);
      challenge.updateOverdueStatus();
      this.challengeRepository.update(challenge);

      if (challenge.status == ChallengeStatus.Completed) {
        const email = new Congrats(challenge.player.emailAddress);
        this.emailService.sendMail(email);
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
