import { Guid } from '@tokilabs/lang';
import { Challenge } from '../challenge-entity';
import { EmailAddress } from '../EmailService/email-service';

export class Player {
  private _id: Guid;
  constructor(
    private _name: string,
    private _email: EmailAddress,
    private _challenges: Challenge[] = []
  ) {
    this._id = new Guid();

    if(_name == ""){
      throw new Error("Player requires a name")
    }

    if(_email == null){
      throw new Error("Player requires an email")
  }
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
