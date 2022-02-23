import { Guid } from '@tokilabs/lang';

import { Challenge } from './challenge-entity';

export class Player {
  private _id: Guid;
  constructor(
    private _name: string,
    private _email: string,
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

  get email() {
    return this._email;
  }

  get challenges() {
    return this._challenges;
  }
}
