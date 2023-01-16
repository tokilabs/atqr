import { Email } from './email';
import { IMailer } from './interfaces/mailer.interface';

export class EmailService {
  constructor(private mailer: IMailer) {}

  public sendEmail(email: Email): Promise<unknown> {
    return this.mailer.sendMail(email);
  }
}
