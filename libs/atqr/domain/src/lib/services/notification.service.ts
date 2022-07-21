import { Exception } from '@tokilabs/lang';
import { Email, EmailAddress, IMailer } from '../EmailService';
import { IChallengeRepository } from '../repository.interfaces';

export class NotificationService {
  constructor(
    private mailer: IMailer,
    private challengeRepository: IChallengeRepository
  ) {}

  public notifyOverdueChallenges() {
    this.challengeRepository.findOverdueChallenges().then((challenges) => {
      Promise.all(
        challenges.map((c) => {
          if (c.updateOverdueStatus() === true) {
            try {
              // @todo: Raquel, please instantiate the correct Email subclass instance
              const email = new Email(
                new EmailAddress('temp@temp.com'),
                '',
                ''
              );
              this.mailer.sendMail(email);
              this.challengeRepository.update(c);
            } catch (err) {
              throw new Exception(
                `Error updating overdue status of Challenge ${c.id}: ${
                  err.message || err
                }`
              );
            }
          }
        })
      );
    });
  }
}
