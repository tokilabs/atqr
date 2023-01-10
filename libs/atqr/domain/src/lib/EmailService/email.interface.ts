import { IsEmail } from 'class-validator';
import { validate } from '../services/validateOrReject';

abstract class ValueObject<EmailAddress> {
  type: EmailAddress;
  value: string;
}
export class EmailAddress extends ValueObject<EmailAddress> {
  type: EmailAddress;
  value: string;
  @IsEmail()
  emailAddress: string;

  constructor(emailAddress: string) {
    super();
    this.emailAddress = emailAddress;
  }
  static createEmailAddress(emailAddress: string): EmailAddress {
    return new EmailAddress(emailAddress);
  }
}
export interface IEmail {
  to: EmailAddress;
  subject: string;
  message?: string;
}
export class Email implements IEmail {
  constructor(
    public to: EmailAddress,
    public subject: string,
    public body?: string
  ) {
    this.to = to;
    this.subject = subject;
    this.body = body;
    return new Email(
      (to = this.to),
      (subject = this.subject),
      (body = this.body)
    );
  }

  public get email() {
    return this.to;
  }

  public get from() {
    return process.env.FROM_EMAIL;
  }

  public get Subject() {
    return this.subject;
  }

  public get Body() {
    return this.body;
  }
}
validate(Email); //uses validateOrReject from class-validator
