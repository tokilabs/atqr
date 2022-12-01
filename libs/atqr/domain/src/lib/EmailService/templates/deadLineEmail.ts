import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');
import { pathToTemplates } from './challengeStarted';

const compileTemplate = pug.compileFile(
  path.join(pathToTemplates, 'deadLineEmail.pug')
);

export class DeadLineEmail extends Email {
  constructor(to: Player) {
    super(
      to,
      'E aí?',
      compileTemplate({
        player: to,
      })
    );
  }
}
