import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');
import { pathToTemplates } from './challengeStarted';

const compileTemplate = pug.compileFile(
  path.join(pathToTemplates, 'payThePrice.pug')
);

export class PayThePrice extends Email {
  constructor(to: Player | Player['_email']) {
    super(to, 'Não cumpriu o desafio', compileTemplate({player: to}));
  }
}
