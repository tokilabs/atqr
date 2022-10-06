import { Guid } from '@tokilabs/lang';
import { Challenge } from './entities/challenge/challenge.entity';

export const IChallengeRepository = Symbol.for('IChallengeRepository');

export interface IChallengeRepository {
  create(challenge: Challenge);

  findMany(numberOfResults?: number);

  findUnique(id: Guid);

  findOverdueChallenges(
    numberOfResults?: number,
    skip?: number
  ): Promise<Challenge[]>;

  update(challenge: Challenge);
}
