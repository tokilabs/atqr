import { Player } from '../entities/player/player.entity';

export interface IEmail {
  to: Player;
  subject: string;
  message?: string;
}

export interface IMailer {
  sendMail(email: Email): Promise<unknown>;
}

export class Email implements IEmail {
  constructor(
    public to: Player,
    public subject: string,
    public message?: string
  ) {
    this.to = to;
    this.subject = subject;
    this.message = message;
  }

  public get playerEmail() {
    return this.to.emailAddress.value;
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


