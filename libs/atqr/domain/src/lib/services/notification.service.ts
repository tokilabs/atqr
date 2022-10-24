import { Exception } from '@tokilabs/lang';
import { Email, IMailer } from '../EmailService';
import { IChallengeRepository } from '../challenge/challengeRepo.interface';

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
              const player = c.player;
              const email = new Email(
                player,
                'OverdueChallenge',
                'Your time is over'
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
