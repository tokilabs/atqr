import { CronJob } from 'cron';
import { ChallengeRepository } from './repositories/challenge.repository'


export class DeadlineMonitorService {
  private _cron: CronJob;
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

  get cron(){
    return this._cron;
  }


  private passedDeadline() {
    this.getChallengeOnGoing.findOngoingChallenges(new Date())

  }
}

