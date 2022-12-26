import { EmailAddress } from './emailAddress';
export interface IEmail {
  to: EmailAddress;
  subject: string;
  message?: string;
}
