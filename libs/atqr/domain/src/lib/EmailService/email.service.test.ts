import { EmailService } from './email.service';
import { Email } from '../valueObjects/email';
import { EmailAddress } from '../valueObjects/emailAddress';
describe('EmailService', () => {
  it('should call sendMail with the correct params', () => {
    const mailer = {
      sendMail: jest.fn(),
    };
    const emailService = new EmailService(mailer);
    const emailAddress = new EmailAddress('test@gmail.com');
    const email = new Email(emailAddress, 'test', 'test');
    emailService.sendEmail(email);
  });
});
