import { ChallengeStatus } from '@atqr/domain';
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


const player = document.getElementById('player');
const resumeChallenge = document.getElementById('description');
const deadline = document.getElementById('deadline');
const text = document.getElementById('text')

const congratsButton = document.getElementsByClassName('congratsButton');
const reproveButton = document.getElementsByClassName('reproveButton');

resumeChallenge.innerHTML = 'O desafio é' + challenge.description;
deadline.innerHTML = 'Até: ' + deadline;
