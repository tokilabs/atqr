import { atqrApi } from './api';
import { challengeDto } from '../pages/challenge/challenge';

declare type Challenge = import('@atqr/domain').Challenge;


const nextStepBtn = document.getElementById('proximo-passo-btn');
nextStepBtn.addEventListener('click', challengeYourself);

export async function challengeYourself(id) {
  const challenge: Challenge = await atqrApi.challenges.create(challengeDto);
}
