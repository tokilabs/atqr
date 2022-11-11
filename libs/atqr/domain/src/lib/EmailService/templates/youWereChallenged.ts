import { Player } from '../../player/player.entity';
import { Email } from '../email.service';
import {Challenge } from '../../challenge/challenge.entity'
import * as pug from 'pug';
import path = require('path');

const compileTemplate = pug.compileFile(
  path.join(__dirname, 'challengeStarted.pug')
);



export class YouWereChallenged extends Email {
  constructor(to: Player, challenge: Challenge) {
    super(to, 'Você foi desafiado', compileTemplate({supervisor: challenge.supervisorName}));
  }
}
