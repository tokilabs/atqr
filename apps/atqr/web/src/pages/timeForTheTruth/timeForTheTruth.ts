import { ChallengeStatus } from '@atqr/domain';
import { getUrlId } from '../../services/urlDetails';
import { atqrApi } from '../../services/apiClient';

const idUrl = getUrlId.toString();
const urlId = idUrl;
export async function congratsButton() {
  const challengeStatusUpdated =
    await atqrApi.challenges.challengeUpdated.statusUpdated(
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
    await atqrApi.challenges.challengeUpdated.statusUpdated(
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
};
