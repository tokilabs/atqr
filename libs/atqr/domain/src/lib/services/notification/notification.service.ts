import { Exception } from '@tokilabs/lang';
import { ChallengeStatus } from '../../types/enums';
import { IChallengeRepository } from '../../challenge/IChallenge.repository'
import { Challenge } from '../../challenge'
import {
  Congrats,
  DeadLineEmail,
  PayThePrice,
} from '../../templates';
import { IMailer } from './mailer.interface'
import { ChallengeStatus } from '../../types';


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
              this.mailer.sendMail(email);
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
    if (challenge.status == ChallengeStatus.Finished) {
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
