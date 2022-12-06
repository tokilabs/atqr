import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');
import { Challenge } from '../../../lib/challenge';
import { pathToTemplates } from './challengeStarted';

export const pugFile = pug.compileFile(
  path.join(pathToTemplates, 'SupConfirmation.pug')
);

export class SupConfirmation extends Email {
  constructor(to: Challenge['_supervisorEmail']) {
    super(
      to,
      'Você foi convidado a ser supervisor de ${player.name}...',
      pugFile({
        player: to,
      })
    );
  }
}
