import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import { Challenge } from '../../challenge/challenge.entity';
import * as pug from 'pug';
import path = require('path');
import { pathToTemplates } from './challengeStarted';

const compileTemplate = pug.compileFile(
  path.join(pathToTemplates, 'challengeStarted.pug')
);

export class YouWereChallenged extends Email {
  constructor(to: Player['_email'], challenge: Challenge) {
    super(
      to,
      'Você foi desafiado',
      compileTemplate({ supervisor: challenge.supervisorName })
    );
  }
}
