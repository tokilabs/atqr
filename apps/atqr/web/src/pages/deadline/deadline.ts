//import { getUrlId } from '../../services/urlDetails';
import { atqrApi } from '../../services/apiClient';


// const idUrl = getUrlId.toString();

// const urlId = idUrl;


export const getChallenge = ()=>{
  const data = atqrApi.challenges.getOne('123456')
  return data
}


console.log('got challenge:', getChallenge())

export function updateUI(data, htmlElement: string) {
  console.log('new result: ', data);
  const fields = document.querySelectorAll(`[${htmlElement}]`);
   fields.forEach((field) => {
    const path = (field as HTMLElement).dataset.field.split('.');
    let value = data;
    path.forEach((key) => {
      value = data[key];
    });
    field.innerHTML = value;
  });
}
 updateUI(getChallenge(), 'data-field')

// export async function congratsButton() {
//   const challengeStatusUpdated =
//     await atqrApi.challenges.challengeUpdated.statusUpdated(
//       idUrl, // pegar id da url
//       ChallengeStatus.Completed
//     );
//   if (!urlId) {
//     return Error('error');
//   }
//   if (challengeStatusUpdated != ChallengeStatus.Completed) {
//     return Error('error');
//   } else {
//     return challengeStatusUpdated;
//   }
// }

// export async function reproveButton() {
//   const challengeStatusUpdated =
//     await atqrApi.challenges.challengeUpdated.statusUpdated(
//       idUrl, // pegar id da url,
//       ChallengeStatus.Failed
//     );
//   if (!urlId) {
//     return Error('error');
//   }
//   if (challengeStatusUpdated != ChallengeStatus.Failed) {
//     return Error('error');
//   } else {
//     return challengeStatusUpdated;
//   }
// };
