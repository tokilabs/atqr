import { Challenge } from '../challenge/challenge.entity';
import { Player } from '../player/player.entity';

export interface IEmail {
  to: Player | Player['_email'] | Challenge['_supervisorEmail'];
  subject: string;
  message?: string;
}
