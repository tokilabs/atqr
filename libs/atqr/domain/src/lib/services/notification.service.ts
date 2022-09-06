import { Exception } from '@tokilabs/lang';
import { ChallengeStatus } from '../challenge';
import { DeadLineEmail, IMailer } from '../EmailService';
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
          if (c.updateOverdueStatus(ChallengeStatus[c.status]) === true) {
            try {
              const player = c.player;
              const email = new DeadLineEmail(
                player,
              );
              this.mailer.sendMail(email);
              c.updateOverdueStatus(ChallengeStatus.Overdue);
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
