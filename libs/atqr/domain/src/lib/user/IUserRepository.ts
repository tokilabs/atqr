
import { Guid } from '@tokilabs/lang';
import { User } from './user.entity';

export interface IUserRepository {
  create(user: User): Promise<void>;

  findMany(numberOfResults?: number): Promise<User[]>;

  findUnique(id: Guid): Promise<User>;

  update(user: User): Promise<void>;
}

export const IUserRepository = Symbol.for('IUserRepository');
