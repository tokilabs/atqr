import { Guid, isEmpty } from '@tokilabs/lang';
import { Challenge } from '../challenge/challenge.entity';
import { EmailAddress } from '../EmailService';
import {
  InvalidParameterInfo,
  InvalidParametersException,
} from '../exceptions/invalidParameters.exception';
import { PaymentEntity } from '../payment/payment.entity';

export class Player {
  private _id: Guid;
  private _paymentEntity: PaymentEntity;

  constructor(
    private _name: string,
    private _email: EmailAddress,
    private _challenges: Challenge[] = []
  ) {
    this._id = new Guid();
    const errors: InvalidParameterInfo[] = [];

    if (typeof _name !== 'string' || isEmpty(_name.trim())) {
      errors.push({ name: '_name', error: 'Player requires a name' });
    }

    if (!(_email instanceof EmailAddress)) {
      errors.push({ name: '_email', error: 'Player requires an email' });
    }

    if (errors.length > 0) {
      throw new InvalidParametersException(errors);
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

  get paymentEntity() {
    return this._paymentEntity;
  }
}
