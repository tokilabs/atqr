import { Player } from '../../player/player.entity';
import { Email } from '../email.service';

export class ChallengeStarted extends Email {
  constructor(to: Player) {
    super(to, 'Seu desafio começou', 'Mensagem de boas vindas');
  }
}