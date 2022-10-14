import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');

const compileTemplate = pug.compileFile(
  path.join(__dirname, 'deadLineEmail.pug')
);

export class DeadLineEmail extends Email {
  constructor(to: Player) {
    super(to, 'E aí?', ' .... ', compileTemplate({
      player: to,
    }));
  }
}

