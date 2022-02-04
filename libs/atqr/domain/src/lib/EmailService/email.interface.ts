import * as EmailValidator from 'email-validator';

export interface Email {
  to: EmailAddress;
  subject: string;
  body: string;
}

export class EmailAddress {
  email: string;

  constructor(emailText: string) {
    const isValidEmail = EmailValidator.validate(emailText);

    if (isValidEmail) {
      this.email = emailText;
    } else {
      throw new Error('Invalid Email');
    }
  }
}

export interface EmailTransporter {
  // eslint-disable-next-line no-empty-pattern
  sendMail(email: Email): void;
}
