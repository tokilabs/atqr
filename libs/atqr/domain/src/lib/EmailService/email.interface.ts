
import { Player } from '../player/player.entity';

export interface IEmail {
 to: Player;
  subject: string;
  message?: string;
}


