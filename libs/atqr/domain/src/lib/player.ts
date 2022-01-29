import { Guid } from '@tokilabs/lang';

import { Challenge } from './challenge-entity';

export class Player {
  constructor(
    private _id: Guid,
    private _name: string,
    private _email: string,
    private _challenges: Challenge[]
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get challenges() {
    return this._challenges;
  }
}
