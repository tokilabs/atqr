import { IsEnum } from 'class-validator';
import { ChallengeStatus } from '@atqr/domain';
export class CompleteChallengeDto {
  @IsEnum(ChallengeStatus)
  status: ChallengeStatus;
}
