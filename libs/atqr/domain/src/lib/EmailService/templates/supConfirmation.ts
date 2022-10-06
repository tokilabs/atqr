import { Player } from '../../player/player.entity';
import { Email } from '../email.service';



export class SupConfirmation extends Email {
  constructor(to: Player) {
    super(
      to,
      'Você foi convidado a ser supervisor de ${playerName}...',
      'Explicação do jogo'
    );
  }
}