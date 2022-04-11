import { Challenge } from './challenge-entity';
import { CronJob } from 'cron';
import { DeadlineInterface } from './deadline-interface';


export class DeadlineMonitorService {
  private _cron: CronJob;

  constructor() {
    this._cron = new CronJob(
      '* * * 0 * *',
      this.callEmail,
      null,
      true,
      'America/Los_Angeles'
    );
  }

  get cron(){
    return this._cron;
  }

  addToQueue(ongoing: DeadlineInterface[]) {
    //pegar toda challenge que for criada e adicionar nessa lista!

  }

  private callEmail() {
    console.log('')

    //procurar no banco de dados os deadlines que ja passaram nas challenges,
    //receber as challenges que ja passaram mas ainda não mandamos email, chamar o serviço de email
  }
}
//a gente precisa de uma lista dos emails/deadlines/challenges enviados recentemente.
//E de um novo CronJob que verifique essa lista e o estado dos deadlines/email
//se precisa mandar novamente caso tenha dado algum erro
