import { atqrApi } from "../../services/apiClient";
import { updateStatus,  ChallengeStatus } from "../../services/interfaces";
import {updateUI} from '../../services/updateUi'

export const getChallenge = () => {
  const data = atqrApi.challenges.getOne('');
  console.log('this is data :', data);
  return data;
};

updateUI(getChallenge(), 'data-field');

const updateChallenge = updateStatus('', ChallengeStatus.Ongoing)

console.log('challenge updated:' , updateChallenge)
console.log('new challenge status:' , updateChallenge.valueOf())
export const btnUpdateChallenge = ()=>{
  updateChallenge

  return updateChallenge

}
console.log('button did update:', btnUpdateChallenge())
