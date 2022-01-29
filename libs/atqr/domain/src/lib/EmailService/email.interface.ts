import { isEmail } from 'class-validator';
import * as EmailValidator from 'email-validator';
import { EmailService } from './email-service';

export interface Email {
  // from: string;
  to: EmailAddress;
  subject: string;
  message: string;
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
