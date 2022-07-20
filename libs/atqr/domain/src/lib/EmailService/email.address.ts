import * as EmailValidator from 'email-validator';
export class EmailAddress {
  email: string;

  constructor(email: any) {
    const isValidEmail = EmailValidator.validate(email);

    if (isValidEmail) {
      this.email = email;
    } else {
      throw new Error('Invalid Email');
    }
  }
}
