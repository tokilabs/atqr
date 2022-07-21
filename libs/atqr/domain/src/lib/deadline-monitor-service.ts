import { CronJob } from 'cron';
import { DeadlineInterface } from './deadline-interface';
import { ChallengeRepository } from '../../../../../apps/atqr/api/src/app/repositories/challenge.repository'

const createChallenge: ChallengeRepository;
createChallenge.create()

export class DeadlineMonitorService {
  private _cron: CronJob;
  // _deadline: DeadlineInterface;
  getChallengeOnGoing: ChallengeRepository;

  constructor() {
    this._cron = new CronJob(
      '* * * 0 * *',
      this.passedDeadline,
      null,
      true,
      'America/Los_Angeles'
    );
  }

  // get deadline() {
  //   return this._deadline
  // };

  get cron(){
    return this._cron;
  }


  private passedDeadline() {
    this.getChallengeOnGoing.findOngoingChallenges(new Date())

    //procurar no banco de dados os deadlines que ja passaram nas challenges,
    //receber as challenges que ja passaram mas ainda não mandamos email, chamar o serviço de email
  }
}
//a gente precisa de uma lista dos emails/deadlines/challenges enviados recentemente.
//E de um novo CronJob que verifique essa lista e o estado dos deadlines/email
//se precisa mandar novamente caso tenha dado algum erro
