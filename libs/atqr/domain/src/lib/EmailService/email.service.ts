import { IEmail } from '.';
import { Challenge } from '../challenge/challenge.entity';
import { Player } from '../player/player.entity';

export interface IMailer {
  sendMail(email: Email): Promise<unknown>;
}

export class Email implements IEmail {
  constructor(
    public to: Player['_email'] | Challenge['_supervisorEmail'],
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
