import { Challenge } from '../../Challenge/challenge.entity';
import { IsDefined } from 'class-validator';

export class ChallengeEnvelope {
  @IsDefined()
  challenge: Challenge;
}
export class ChallengeAndInviteeEnvelope {
  @IsDefined()
  challenge: Challenge;

  @IsDefined()
  invitee: string | string[];
}
