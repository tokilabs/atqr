import { Email } from '../email.service';
import * as pug from 'pug';
import * as path from 'path';
import { pathToTemplates } from './includes/pathToTemplates';
import { Challenge } from '../../../lib/challenge';

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
