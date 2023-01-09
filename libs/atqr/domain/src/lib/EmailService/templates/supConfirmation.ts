import { Email } from '../email.service';
import * as pug from 'pug';
import * as path from 'path';
import { pathToTemplates } from './includes/pathToTemplates';
import { Challenge } from '../../../lib/challenge';

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
