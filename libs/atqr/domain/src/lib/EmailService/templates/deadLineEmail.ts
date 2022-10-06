import { Player } from '../../player/player.entity';
import { Email } from '../email.service';


export class DeadLineEmail extends Email {
  constructor(to: Player) {
    super(to, 'E aí?', ' .... ');
  }
}

