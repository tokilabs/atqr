import { Challenge } from './challenge-entity';
import { CronJob } from 'cron';
import { DeadlineInterface } from './deadline-interface';


export class DeadlineMonitorService {
  private _ongoing: DeadlineInterface[] = [];
  private _cron: CronJob;

  constructor() {
    this._cron = new CronJob(
      '* * * 0 * *',
      this.dispatchEvent,
      null,
      true,
      'America/Los_Angeles'
    );
  }

  get cron(){
    return this._cron;
  }

  addToQueue(challenge: Challenge) {
    //pegar toda challenge que for criada e adicionar nessa lista!


  }

  failChallenge(challenge: Challenge) {
    console.log('a')
  }

  private dispatchEvent() {

    //procurar no banco de dados os deadlines que ja passaram nas challenges, receber as challenges que ja passaram mas ainda não mandamos email, chamar o serviço de email
  }
}
