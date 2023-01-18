import { Guid } from '@tokilabs/lang';
import { Player } from './player.entity';
<<<<<<< HEAD
import { EmailAddress } from '../templates';
=======
import { EmailAddress } from '../emailTemplates';
>>>>>>> 78be758 (style(emailservice folder is no emailtemplates): email service stuff is implemented else where)

export const IPlayerRepository = Symbol.for('IPlayerRepository');

export interface IPlayerRepository {
  findUnique(id: Guid);

  findByEmail(email: EmailAddress): Player;

  create(player: Player);
}
