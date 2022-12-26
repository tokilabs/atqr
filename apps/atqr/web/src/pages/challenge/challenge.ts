import { atqrApi } from '../../services/apiClient';
import { updateStatus, ChallengeStatus } from '../../services/interfaces';
import { updateUI } from '../../services/updateUi';

export const getChallenge = () => {
  const data = atqrApi.challenge.getOne('');
  return data;
};

updateUI(getChallenge(), 'data-field');

const updateChallenge = updateStatus('', ChallengeStatus.Ongoing);

export const btnUpdateChallenge = () => {
  updateChallenge;

  return updateChallenge;
};
console.log('button did update:', btnUpdateChallenge());
