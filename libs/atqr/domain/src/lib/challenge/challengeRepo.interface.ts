import { Guid } from '@tokilabs/lang';
import { Challenge } from './challenge.entity';
import { EmailAddress } from '../EmailService';
import { Player } from '../player';

export interface IChallengeRepository {
  create(challenge: Challenge): void;

  findLastChallenges(amount: number): Promise<Challenge[]>;

  findMany(numberOfResults?: number): Promise<Challenge[]>;

  findUnique(id: Guid): Promise<Challenge>;

  findOverdueChallenges(
    numberOfResults?: number,
    skip?: number
  ): Promise<Challenge[]>;

  update(challenge: Challenge): void;
}

export interface IPlayerRepository {
  findUnique(id: Guid): Promise<Player>;

  findByEmail(email: EmailAddress): Player;

  create(player: Player): void;
}

export const IChallengeRepository = Symbol.for('IChallengeRepository');
export const IPlayerRepository = Symbol.for('IPlayerRepository');
