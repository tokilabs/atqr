import { EmailAddress } from '../../valueObjects';

export interface IEmail {
  to: EmailAddress;
  subject: string;
  message?: string;
}
