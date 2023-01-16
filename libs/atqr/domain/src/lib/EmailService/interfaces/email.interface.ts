import { EmailAddress } from '../email';

export interface IEmail {
  to: EmailAddress;
  subject: string;
  message?: string;
}
