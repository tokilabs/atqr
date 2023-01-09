import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import * as path from 'path';
import { pathToTemplates } from './includes/pathToTemplates';


const compileTemplate = pug.compileFile(
  path.join(pathToTemplates, 'challengeStarted.pug')
);

export class ChallengeStarted extends Email {
  constructor(to: Player['_email']) {
    super(
      to,
      'Seu desafio começou',
      compileTemplate({
        player: to,
      })
    );
  }
}
