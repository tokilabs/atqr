import { Guid } from '@tokilabs/lang';
import { Challenge } from './challenge.entity';

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

export const IChallengeRepository = Symbol.for('IChallengeRepository');
