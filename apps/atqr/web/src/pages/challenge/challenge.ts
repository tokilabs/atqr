import { atqrApi } from "../../services/apiClient";
import { updateStatus, IEmailAddress, playerChallenges, IPlayer, SupervisorEnum, ChallengeStatus, challenge } from "../../services/interfaces";
import {updateUI} from '../../services/updateUi'

export const getChallenge = () => {
  const data = atqrApi.challenges.getOne('123456');
  console.log('this is data :', data);
  return data;
};

updateUI(getChallenge(), 'data-field');

const updateChallenge = updateStatus('123456', getChallenge().updateStatus().Completed)

console.log('challenge updated:' , updateChallenge)
console.log('new challenge status:' , updateChallenge.valueOf())
export const btnUpdateChallenge = ()=>{
  updateChallenge
  
  return updateChallenge
  
}
console.log('button did update:', btnUpdateChallenge())



