import { IEmail } from './interfaces';

export class Email implements IEmail {
  to: EmailAddress;
  subject: string;
  message?: string;
  constructor(to: EmailAddress, subject: string, message?: string) {
    this.to = to;
    this.subject = subject;
    this.message = message;
  }

  public get email() {
    return this.to;
  }

  public get Subject() {
    return this.subject;
  }

  public get Message() {
    return this.message;
  }
}

export class EmailAddress {
  public value: string;
  constructor(value: string) {
    this.value = value;
  }
}
