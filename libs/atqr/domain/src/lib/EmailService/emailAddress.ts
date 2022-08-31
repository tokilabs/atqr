import { Exception } from '@tokilabs/lang';
import * as EmailValidator from 'email-validator';
import { errAsync } from 'neverthrow';

export class EmailAddress {
  value: string;

  constructor(email: string) {
    const isValidEmail = EmailValidator.validate(email);

    if (isValidEmail) {
      this.value = email;
    } else {
      errAsync(
        new Error('Error validating email. Please check the EmailValidator')
      );
    }
  }
}
