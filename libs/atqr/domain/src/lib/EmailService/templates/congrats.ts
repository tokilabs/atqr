import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import * as path from 'path';
import { pathToTemplates } from './includes/pathToTemplates';

const compileTemplate = pug.compileFile(
  path.join(pathToTemplates, 'congrats.pug')
);

export class Congrats extends Email {
  constructor(to: Player['_email']) {
    super(to, 'Cumpriu o desafio', compileTemplate({ player: to }));
  }
}
