import { ChallengeStatus } from '@atqr/domain';
import {
  IsEnum,
  IsInstance,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateCreditCardTokenDto } from './updateCreditCardToken.dto';

export class UpdateChallengeDto {
  @IsOptional()
  @IsEnum(ChallengeStatus)
  challengeStatus: ChallengeStatus;

  @IsOptional()
  @ValidateNested()
  @IsInstance(UpdateCreditCardTokenDto)
  updateCreditCard: UpdateCreditCardTokenDto;

  @IsOptional()
  @IsString()
  updateSupervisor: string;

  @IsNumber()
  @IsOptional()
  case: number;
}
