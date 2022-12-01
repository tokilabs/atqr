/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { error } from 'console';
declare const AxiosError: typeof import('axios').AxiosError;

// Question: Where is this instance being used? If this is dead code it should not have been commited
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts/',
});

// TODO: Change variable names to english
const seuNome = document.getElementById('seu-nome');
const seuEmail = document.getElementById('seu-email');
const nomeSupervisor = document.getElementById('nome-supervisor');
const emailSupervisor = document.getElementById('email-supervisor');
const descricao = document.getElementById('descricao');
// TODO: Avoid abbreviations
const nextStepBtn = document.getElementById('proximo-passo-btn');
nextStepBtn.addEventListener('click', challengeYourself);

const url = 'https://jsonplaceholder.typicode.com/posts/';
// TODO: Consume Api
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
