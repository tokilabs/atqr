import { Exception } from '@tokilabs/lang';
import { Challenge, ChallengeStatus } from '../challenge';
import { Congrats, Email, IMailer, PayThePrice } from '../EmailService';
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
  public notifyCompletedChallenges(challenge: Challenge) {
    if (challenge.status == ChallengeStatus.Completed) {
      const email = new Congrats(challenge.player);
      this.mailer.sendMail(email);
    } else {
      const email = new PayThePrice(challenge.player);
      this.mailer.sendMail(email);
      return true;
    }
    this.challengeRepository.update(challenge);
  }
}
