"use strict";
exports.__esModule = true;
exports.updateUI = exports.getChallenge = void 0;
//import { getUrlId } from '../../services/urlDetails';
var apiClient_1 = require("../../services/apiClient");
// const idUrl = getUrlId.toString();
// const urlId = idUrl;
var getChallenge = function () {
    var data = apiClient_1.atqrApi.challenges.getOne('123456');
    return data;
};
exports.getChallenge = getChallenge;
console.log('got challenge:', (0, exports.getChallenge)());
function updateUI(data, htmlElement) {
    console.log('new result: ', data);
    var fields = document.querySelectorAll("[".concat(htmlElement, "]"));
    fields.forEach(function (field) {
        var path = field.dataset.field.split('.');
        var value = data;
        path.forEach(function (key) {
            value = data[key];
        });
        field.innerHTML = value;
    });
}
exports.updateUI = updateUI;
console.log('TA CERTO', updateUI((0, exports.getChallenge)(), 'data-name'));
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
