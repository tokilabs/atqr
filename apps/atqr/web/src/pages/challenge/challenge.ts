import { atqrApi } from '../../services/api';
import { EmailAddress, Player } from '@atqr/domain';
import { CreateChallengeDto } from 'apps/atqr/api/src/app/dtos';
import { AxiosError } from 'axios';
import axiosInstance from '../acceptChallenge/acceptChallenge';
// challenge attribute
const yourName = document.getElementById('seu-nome').innerHTML;
const yourEmail = document.getElementById('seu-email').innerHTML;
const deadlineString = document.getElementById('deadline').innerHTML;
const deadline = new Date(deadlineString);
const supervisorName = document.getElementById('nome-supervisor').innerHTML;
const supervisorEmail = document.getElementById('email-supervisor').innerHTML;
const goal = document.getElementById('descricao').innerHTML;
const priceString = document.getElementById('price').innerHTML;
const price = Number(priceString);



declare const axios: typeof import('axios').default;

const emailAddress = new EmailAddress(yourEmail);
const player = new Player(yourName, emailAddress);

export const challengeDto: CreateChallengeDto = {
  goal,
  deadline,
  price,
  player,
  supervisorName,
  supervisorEmail,
};

const challenge = await atqrApi.challenges.create(challengeDto);

//page construction
const nextStepBtn = document.getElementById('proximo-passo-btn');
nextStepBtn.addEventListener('click', challenge);
const goalTitle = document.getElementById('main-title');
goalTitle.innerHTML = 'seu desafio ' + challenge.goal + ' foi criado';

//page challenge created
const resumeCreatedChallenge = document.getElementById('text');
resumeCreatedChallenge.innerHTML =
  'seu desafio é' +
  challenge.goal +
  'até a data' +
  challenge.deadline +
  '. Caso não cumpra com seu objetivo, será cobrado de você' +
  challenge.price +
  'reais';

// end page challenge created
