import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');

const compileTemplate = pug.compileFile(
  path.join(__dirname, 'payThePrice.pug')
);



export class PayThePrice extends Email {
  constructor(to: Player) {
    super(to, 'Não cumpriu o desafio', compileTemplate({player: to}));
  }
}
