import { ChallengeStatus } from '@atqr/domain';
import { IsEnum, IsInstance, IsString } from 'class-validator';
import { UpdateCreditCardTokenDto } from './updateCreditCardToken.dto';

export class UpdateChallengeDto {
  @IsEnum(ChallengeStatus)
  challengeStatus?: ChallengeStatus;

  @IsInstance(UpdateCreditCardTokenDto)
  updateCreditCard?: UpdateCreditCardTokenDto;

  @IsString()
  updateSupervisor?: string;
}
