import { ChallengeStatus } from '@atqr/domain';

import { getChallenge } from '../acceptChallenge/acceptChallenge';
import { atqrApi } from '../../services/api';
import { challenge } from '../challenge/challenge';

const api = atqrApi;

getChallenge().then(
  function congratsButton() {
    let challengeStatusUpdated = api.challenges.statusUpdated(
      challenge,
      ChallengeStatus.Completed
    );
    return challengeStatusUpdated;
  },

  function reproveButton() {
    let challengeStatusUpdated = api.challenges.statusUpdated(
      challenge,
      ChallengeStatus.Failed
    );
    return challengeStatusUpdated;
  }
);
