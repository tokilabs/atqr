import { Player } from '../../player/player.entity';
import { Email } from '../email.service';


export class PayThePrice extends Email {
  constructor(to: Player) {
    super(to, 'Não cumpriu o desafio', ' .... ');
  }
}