import * as EmailValidator from 'email-validator';
import { Player } from '../player';

export interface IEmail {
  to: Player;
  subject: string;
  body: string;
}

export class EmailAddress {
  email: string;

  constructor(email: string) {
    const isValidEmail = EmailValidator.validate(email);

    if (isValidEmail) {
      this.email = email;
    } else {
      throw new Error('Invalid Email');
    }
  }
}
