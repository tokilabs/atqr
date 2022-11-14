import { IsUUID } from 'class-validator';

export class UpdateChallengeDto {
  @IsUUID()
  challengeId: string;
}
