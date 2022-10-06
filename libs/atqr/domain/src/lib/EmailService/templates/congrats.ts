import { Player } from '../../player/player.entity';
import { Email } from '../email.service';



export class Congrats extends Email {
  constructor(to: Player) {
    super(to, 'Cumpriu o desafio', ' .... ');
  }
}