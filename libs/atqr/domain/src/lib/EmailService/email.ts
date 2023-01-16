import { IEmail } from './interfaces';

export class Email implements IEmail {
  constructor(
    public to: EmailAddress,
    public subject: string,
    public message?: string
  ) {
    this.to = to;
    this.subject = subject;
    this.message = message;
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
