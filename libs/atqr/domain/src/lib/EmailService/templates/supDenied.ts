import { Player } from '../../player';
import { Email } from '../email.service';
import { pugFile } from './supConfirmation';

export class SupervisorDenied extends Email {
  constructor(to: Player) {
    super(
      to,
      'Supervisor não aceitou seu convite...',
      pugFile({
        player: to.name,
      })
    );
  }
}
