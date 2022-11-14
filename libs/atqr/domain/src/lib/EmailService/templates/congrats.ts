import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');

// const compileTemplate = pug.compileFile(
//   path.join(__dirname, 'congrats.pug')
// );


export class Congrats extends Email {
  constructor(to: Player) {
    super(to,
      'Cumpriu o desafio', '...');
  }
}
