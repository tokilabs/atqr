import { IsEnum, IsUUID } from 'class-validator';
import { StatusEnum } from '@atqr/domain';
export class CompleteChallengeDto {
  @IsUUID()
  challengeId: string;

  @IsEnum(StatusEnum)
  status: StatusEnum;
}
