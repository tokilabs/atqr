// declare const axios: typeof import('axios').default;
import axios, { AxiosError } from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});



const getChallenge = async () => {
  try {
    const res = await axiosInstance({
      method: 'get',
      url: '/todos/5',
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('error message: ');
      return '';
    } else {
      console.log('unexpected error: ', Error);
      return 'An unexpected error occurred';
    }
  }
};

const challenge =  await getChallenge();

const goalTitle = document.getElementById('main-title');
goalTitle.innerHTML = 'seu desafio ' + challenge.goal + ' foi criado';


const getDeadline = challenge.deadline;
const setDeadline = document.getElementById('deadline')
setDeadline.setAttribute("data-countdown", getDeadline)
const setDeadline2 = document.getElementById('deadline2')
setDeadline2.innerHTML = getDeadline;

const resumeCreatedChallenge = document.getElementById('text')
resumeCreatedChallenge.innerHTML = 'seu desafio é' + challenge.goal + 'até a data' + challenge.deadline + '. Caso não cumpra com seu objetivo, será cobrado de você' + challenge.price + 'reais';

function onClickYes(){
 challenge.updateStatus();
}
onClickYes()

function onClickNo(){
challenge.updateStatus();
// atualizar pra uma página dizendo que a resposta foi enviada e agradecendo? exibir apenas uma mensagem onde era o botão?
}
onClickNo()



