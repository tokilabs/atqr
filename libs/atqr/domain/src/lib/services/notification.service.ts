import { Exception } from '@tokilabs/lang';
import { Challenge, ChallengeStatus } from '../challenge/challenge.entity';
import { IChallengeRepository } from '../challenge/IChallenge.repository';
import {
  Congrats,
  DeadLineEmail,
  IMailer,
  PayThePrice,
} from '../emailTemplates';

export class NotificationService {
  constructor(
    private mailer: IMailer,
    private challengeRepository: IChallengeRepository
  ) {}

  public notifyOverdueChallenges() {
    this.challengeRepository.findOverdueChallenges().then((challenges) => {
      Promise.all(
        challenges.map((c) => {
          //return challenges that are filtered by findOverdueChallenges()
          //in array format:
          //[challenge1,challenge2, challenge3...]
          if (c.updateOverdueStatus() === true) {
            // challenge status updated to overdue
            try {
              const email = new DeadLineEmail(c.supervisorEmail);
              //create email to send to sup
              this.mailer.send(email);
              //sends that email
              this.challengeRepository.update(c);
              //do challenge update that are overdue
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
      //challenge status = completed
      const player = challenge.player;
      const email = new Congrats(player.emailAddress);
      this.mailer.sendMail(email);
    } else {
      const email = new PayThePrice(challenge.player.emailAddress);
      this.mailer.sendMail(email);
    }
    this.challengeRepository.update(challenge);
  }
}
