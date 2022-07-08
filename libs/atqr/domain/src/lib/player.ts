import { Guid } from '@tokilabs/lang';
import { EmailAddress, IEmail } from '..';
import { Challenge } from './challenge-entity/challenge-entity';

export class Player {
  private _id: Guid;
  constructor(
    private _name: string,
    private _email: EmailAddress,
    private _challenges: Challenge[] = []
  ) {
    this._id = new Guid();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get emailAddress() {
    return this._email;
  }

  get challenges() {
    return this._challenges;
  }
}
