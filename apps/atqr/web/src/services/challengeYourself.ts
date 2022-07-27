import axios, { AxiosResponse } from 'axios';
import { error } from 'console';
declare const AxiosError: typeof import('axios').AxiosError;

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts/',
});

const seuNome = document.getElementById('seu-nome');
const seuEmail = document.getElementById('seu-email');
const nomeSupervisor = document.getElementById('nome-supervisor');
const emailSupervisor = document.getElementById('email-supervisor');
const descricao = document.getElementById('descricao');
const nextStepBtn = document.getElementById('proximo-passo-btn');
nextStepBtn.addEventListener('click', challengeYourself);

declare type Challenge =
  import('../../../../../libs/atqr/domain/src/lib/challenge-entity').Challenge;

const url = 'https://jsonplaceholder.typicode.com/posts/';

async function challengeYourself(id) {
  try {
    const res = axios.post(`${url}`);

    if (error instanceof AxiosError) {
      throw error;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}
