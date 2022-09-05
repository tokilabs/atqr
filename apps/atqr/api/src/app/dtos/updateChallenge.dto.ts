import { ChallengeStatus } from '@atqr/domain';
import { isDefined, IsEnum, IsInstance, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
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
  case: number
}
