import { IEmail } from './email.interface';

export interface IMailer {
  sendMail(email: IEmail): Promise<unknown>;
}
