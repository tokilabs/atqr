import { Guid } from '@tokilabs/lang';
import { EmailAddress } from '../valueObjects';
import { User } from './user.entity';

export interface IUserRepository {
  createUser(user: User): Promise<void>;

  findUniqueUser(id: Guid): Promise<User>;

  findManyUsersContenders(
    user: User,
    numberOfResults?: number
  ): Promise<User[]>;

  findManyUsersJudges(user: User, numberOfResults: number): Promise<User[]>;

  findManyUsersOrganizingChallenges(
    user: User,
    numberOfResults?: number
  ): Promise<User[]>;

  findUniqueUserPaymentMethod(user: User): Promise<User>;

  findUniqueUserEmail(user: User, email: EmailAddress): Promise<User>;

  updateUserPaymentMethod(user: User): Promise<void>;
}

export const IUserRepository = Symbol.for('IUserRepository');
