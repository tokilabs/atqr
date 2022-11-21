import { Exception } from '@tokilabs/lang';
import { errAsync, ResultAsync } from 'neverthrow';
import { Challenge } from '../challenge';
import { Email, IMailer } from '../EmailService';
import { IChallengeRepository } from '../repository.interfaces';

export class NotificationService {
  constructor(
    private mailer: IMailer,
    private challengeRepository: IChallengeRepository
  ) {}

  public notifyOverdueChallenges(): ResultAsync<void, Error> {
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
              return errAsync(
                new Error('Error updating overdue status of Challenge')
              );
            }
          }
        })
      );
    });
    return;
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
