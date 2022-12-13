import { atqrApi } from "../../services/apiClient";
async function getLastChallenges(amount: number) {
  try {
    const data = await atqrApi.challenge.getLatest(amount)
    const topicContent = document.querySelectorAll('.topic-content');
    topicContent.forEach((value, index) => {
      value.querySelector('h3').textContent = data[index].goal;
    });
  } catch (error) {
    const topicContent = document.querySelectorAll('.topic-content');
    topicContent.forEach(value => {
      value.querySelector('h3').textContent = "teste";
    });
    console.error(error);
  }
}
getLastChallenges(0);

