import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import * as pug from 'pug';
import path = require('path');

const compileTemplate = pug.compileFile(
  path.join(__dirname, 'challengeStarted.pug')
);

export class ChallengeStarted extends Email {
  constructor(to: Player) {
    super(
      to,
      'Seu desafio começou',
      compileTemplate({
        player: to,
      })
    );
  }
}
