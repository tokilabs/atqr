import { Guid, isEmpty } from '@tokilabs/lang';
import { Challenge, Entity } from '../challenge/challenge.entity';
import { EmailAddress } from '../EmailService';
import { EntityDTO } from '../entity-type/entity.type';
import {
  InvalidParameterInfo,
  InvalidParametersException,
} from '../exceptions/invalidParameters.exception';



export class Player extends Entity {
  [x: string]: any;
  private _id: Guid;

  constructor(data: {
    name: string;
    email: EmailAddress;
    challenges: Challenge[];
  }) {
    super();
    this._id = new Guid();
    const errors: InvalidParameterInfo[] = [];

    if (typeof data.name !== 'string' || isEmpty(data.name.trim())) {
      errors.push({ name: 'name', error: 'Player requires a name' });
    }

    if (!(data.email instanceof EmailAddress)) {
      errors.push({ name: 'email', error: 'Player requires an email' });
    }

    if (errors.length > 0) {
      throw new InvalidParametersException(errors);
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.name;
  }

  get emailAddress() {
    return this.email;
  }

  get challenges() {
    return this.challenges;
  }
  static createFromObject<Player>(data: EntityDTO<typeof Player>): Player {
    // @FIXME: remove any
    return new Player(data) as any;
  }
}
