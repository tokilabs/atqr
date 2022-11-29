import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');
import { pathToTemplates } from './challengeStarted';
import { Challenge } from '@atqr/domain';

const compileTemplate = pug.compileFile(
  path.join(pathToTemplates, 'deadLineEmail.pug')
);

export class DeadLineEmail extends Email {
  constructor(to: Challenge["supervisorEmail"]) {
    super(to, 'E aí?', compileTemplate({
      player: to,
    }));
  }
}
