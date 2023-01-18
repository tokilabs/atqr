import { EmailService } from './email.service';
import { Email } from '../valueObjects/email';
import { EmailAddress } from '../valueObjects/emailAddress';
describe('EmailService', () => {
  const mailer = {
    sendMail: jest.fn(),
  };
  const emailService = new EmailService(mailer);
  it('should instantiate the class', () => {
    expect(emailService).toBeDefined();
  })
  it('should call sendMail with the correct params', () => {
    const emailAddress = new EmailAddress('test@gmail.com');
    const email = new Email(emailAddress, 'test', 'test');
    emailService.sendEmail(email);
    expect(mailer.sendMail).toBeCalled()
  });
});
