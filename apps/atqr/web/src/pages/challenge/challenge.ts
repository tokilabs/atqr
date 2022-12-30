import { atqrApi } from '../../services/apiClient';
import { updateStatus, ChallengeStatus } from '../../services/interfaces';
import { updateUI } from '../../services/updateUi';

export const getChallenge = () => {
  return atqrApi.challenge.getOne('');
};

export const btnUpdateChallenge = () => {
  return updateStatus('', ChallengeStatus.Ongoing);
};
updateUI(getChallenge(), 'data-field');
