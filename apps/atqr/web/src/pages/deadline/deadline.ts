import { getUrlId } from '../../services/urlDetails';
import { atqrApi } from '../../services/apiClient';
import { ChallengeStatus } from '../../services/interfaces';
import { updateUI } from '../../services/updateUi';

const idUrl = getUrlId.toString();
const urlId = idUrl;

export const getChallenge = () => {
  return atqrApi.challenge.getOne('');

};

console.log('got challenge:', getChallenge());

updateUI(getChallenge(), 'data-field');

export async function congratsButton() {
  const challengeStatusUpdated =
    await atqrApi.challenge.challengeUpdate.status(
      idUrl, // pegar id da url
      ChallengeStatus.Completed
    );
  if (!urlId) {
    return Error('error');
  }
  if (challengeStatusUpdated != ChallengeStatus.Completed) {
    return Error('error');
  } else {
    return challengeStatusUpdated;
  }
}

export async function reproveButton() {
  const challengeStatusUpdated =
    await atqrApi.challenge.challengeUpdate.status(
      idUrl, // pegar id da url,
      ChallengeStatus.Failed
    );
  if (!urlId) {
    return Error('error');
  }
  if (challengeStatusUpdated != ChallengeStatus.Failed) {
    return Error('error');
  } else {
    return challengeStatusUpdated;
  }
}
