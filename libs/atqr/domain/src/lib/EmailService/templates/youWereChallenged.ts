import { Player } from '../../player/player.entity';
import { Email } from '../email.service';


export class YouWereChallenged extends Email {
  constructor(to: Player) {
    super(to, 'Você foi desafiado', ' .... ');
  }
}