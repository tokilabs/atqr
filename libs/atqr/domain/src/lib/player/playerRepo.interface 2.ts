import { Guid } from '@tokilabs/lang';
import { Player } from './player.entity';
import { EmailAddress } from '../valueObjects';

export const IPlayerRepository = Symbol.for('IPlayerRepository');

export interface IPlayerRepository {
  findUnique(id: Guid);

  findByEmail(email: EmailAddress): Player;

  create(player: Player);
}
