import { Player } from "../../player/player.entity";
import { Email } from "../email.service";
import * as pug from 'pug';
import * as path from 'path';
import { pathToTemplates } from './includes/pathToTemplates';

const pugFile = pug.compileFile(
  path.join(pathToTemplates, 'confirmEmail.pug')
);
export class ConfirmEmail extends Email {

    constructor (to: Player['_email']) {
        super(to,
            'Email de confirmação...', pugFile({
              player: to,
            }))
    }
}
