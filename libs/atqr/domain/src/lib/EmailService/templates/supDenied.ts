import { Player } from '../../player';
import { Email } from '../email.service';
import { pugFile } from './supConfirmation';

export class SupervisorDenied extends Email {
  constructor(to: Player['_email']) { // is changed to sup email in other branch
    super(
      to,
      'Supervisor não aceitou seu convite...',
      pugFile({
        player: to,
      })
    );
  }
}
//TODO btn logic to new page choseNewSupervisor
