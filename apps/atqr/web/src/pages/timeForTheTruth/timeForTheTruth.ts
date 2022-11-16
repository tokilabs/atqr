import { ChallengeStatus, Email } from '@atqr/domain';
import { ChallengeController } from '../../../../api/src/app/challenge.controller';
import { challenge } from '../challenge/challenge';

export class TimeForTheTruth {
  constructor(private challengeController: ChallengeController) {}

  challenge = challenge;

  congratsButton() {
    let challengeStatusUpdated = this.challengeController.updateStatus(
      challenge,
      ChallengeStatus.Completed
    );
    return challengeStatusUpdated;
  }

  reproveButton() {
    let challengeStatusUpdated = this.challengeController.updateStatus(
      challenge,
      ChallengeStatus.Failed
    );
    return challengeStatusUpdated;
  }
}


