import { IsEmail } from 'class-validator';
import { validate } from '../services/validateOrReject';
import { ValueObject } from '../../utils/valueObject';

export class EmailAddress {
  @IsEmail()
  emailAddress: string;
}
export interface IEmail {
  to: EmailAddress;
  subject: string;
  message?: string;
}
export class Email extends ValueObject<Email> implements IEmail {
  constructor(
    public to: EmailAddress,
    public subject: string,
    public body?: string
  ) {
    super(Email, Email[to.toString()][subject][body]);
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
