import { Guid } from '@tokilabs/lang';
import { Player } from './player.entity';
import { EmailAddress } from '../EmailService';

export interface IPlayerRepository {
  findUnique(id: Guid): Promise<Player>;

  findByEmail(email: EmailAddress): Promise<Player>;

  create(player: Player): Promise<void>;
}

export const IPlayerRepository = Symbol.for('IPlayerRepository');
