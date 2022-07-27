import { IsEnum } from 'class-validator';
import { StatusEnum } from '@atqr/domain';
export class CompleteChallengeDto {
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
