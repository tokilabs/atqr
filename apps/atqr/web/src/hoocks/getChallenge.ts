import { AxiosResponse } from 'axios';
import { error } from 'console';
import axiosApi from 'apps/atqr/web/src/services/axiosApi';

declare const AxiosError: typeof import('axios').AxiosError;

declare type Challenge =
  import('../../../../../libs/atqr/domain/src/lib/challenge-entity').Challenge;

const url = 'https://jsonplaceholder.typicode.com/posts/';
const urlId = url.substring(url.lastIndexOf('/') + 1);

function showChallenge(res: AxiosResponse) {
  const challengeData = res.data as Challenge;
  const deadline = challengeData.deadline.toString();
  const price = challengeData.price.toString();
  document.getElementById('player-name').innerHTML = challengeData.player.name;
  document.getElementById('challenge-description').innerHTML =
    challengeData.description;
  document.getElementById('challenge-deadline').innerText = deadline;
  document.getElementById('challenge-price').innerHTML = price;

  console.log(res.data);
  return challengeData;
}

export function getChallenge(id) {
  try {
    const res = axiosApi.get(`${url}${id}`);

    if (error instanceof AxiosError) {
      throw error;
    }

    return res;
  } catch (error) {
    console.log(error);
  }
}

document.onload = function () {
  getChallenge(urlId).then(showChallenge);
};
