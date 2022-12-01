import { Exception } from '@tokilabs/lang';
import { Challenge, ChallengeStatus } from '../challenge';
import { IChallengeRepository } from '../challenge/challengeRepo.interface';
import { Congrats, Email, IMailer, PayThePrice } from '../EmailService';

export class NotificationService {
  constructor(
    private mailer: IMailer,
    private challengeRepository: IChallengeRepository
  ) {}

  public notifyOverdueChallenges() {
    this.challengeRepository.findOverdueChallenges().then((challenges) => {
      Promise.all(
        challenges.map((c) => {
          //devolve as challenges que estao sendo filtradas pelo findOverdueChallenges()
          //em um array:
          //[challenge1,challenge2, challenge3...]
          if (c.updateOverdueStatus() === true) {
          // challenge status updated to overdue
            try {
              const player = c.player;
              const email = new Email(
                player,
                'OverdueChallenge',
                'Your time is over'
              );
            //cria um email pra enviar pro player
              this.mailer.sendMail(email);
            //manda o email pro player
              this.challengeRepository.update(c);
            //faz o update do challenge que estiver nessa condicao de overdue
            } catch (err) {
              throw new Exception(
                `Error updating overdue status of Challenge ${c.id}: ${
                  err.message || err
                }`
              );
            //se o catch encontrar um erro, uma nova Exception é criada com a mensagem do erro
            }
          }
        })
      );
    });
  }
  public notifyCompletedChallenges(challenge: Challenge) {
    if (challenge.status == ChallengeStatus.Completed) {
    //challenge status = completed
      const email = new Congrats(challenge.player);
    //cria um email Congrats que eé mandado pro player da challenge
      this.mailer.sendMail(email);
    //envia o email criado
    } else {
      const email = new PayThePrice(challenge.player);
      this.mailer.sendMail(email);
      return true;
    }
    this.challengeRepository.update(challenge);
  }
}