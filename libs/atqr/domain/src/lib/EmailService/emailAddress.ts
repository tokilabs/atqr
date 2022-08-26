import { Exception } from '@tokilabs/lang';
import * as EmailValidator from 'email-validator';

export class EmailAddress {
  value: string;

  constructor(email: string) {
    const isValidEmail = EmailValidator.validate(email);

    if (isValidEmail) {
      this.value = email;
    } else {
      throw new Exception(
        'Error validating email. Please check the EmailValidator'
      );
    }
  }
}
