// declare const axios: typeof import('axios').default
async function getLastChallenges() {
  try {
    const { data } = await axios('https://jsonplaceholder.typicode.com/posts');
    const topicContent = document.querySelectorAll('.topic-content');
    topicContent.forEach((value, index) => {
      value.querySelector('h3').textContent = data[index].title;
    });
  } catch (error) {
    console.error(error);
  }
}
getLastChallenges();
