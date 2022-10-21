import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import axios, { AxiosError } from 'axios';
import * as pug from 'pug';
import path = require('path');
import { Challenge } from '../../../lib/challenge';

export const pugFile = pug.compileFile(
  path.join(__dirname, 'SupConfirmation.pug')
);

export class SupConfirmation extends Email {
  constructor(to: Player, challenge: Challenge) {
    super(
      to,
      'Você foi convidado a ser supervisor de ${player.name}...',
      pugFile({
        player: to.name,
      })
    );
  }
}

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

const getPlayer = async () => {
  try {
    const res = await axiosInstance({
      method: 'get',
      url: 'challenge/player',
      data: 'player',
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
