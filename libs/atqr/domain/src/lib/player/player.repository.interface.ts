import { Guid } from '@tokilabs/lang';
import { Player } from './player.entity';
<<<<<<< HEAD
import { EmailAddress } from '../templates';
=======
import { EmailAddress } from '../emailTemplates';
>>>>>>> 78be758 (style(emailservice folder is no emailtemplates): email service stuff is implemented else where)

export interface IPlayerRepository {
  findUnique(id: Guid): Promise<Player>;

  findByEmail(email: EmailAddress): Promise<Player>;

  create(player: Player): Promise<void>;
}

export const IPlayerRepository = Symbol.for('IPlayerRepository');
