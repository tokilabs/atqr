import { ChallengeStatus, IChallengeRepository } from '../../challenge';
import { CronJob } from 'cron';
import cron from 'cron-validate';
import { dateDiff } from '../../../utils/dateDifference';

export class DeadLineMonitorService1 {
  private _cron: CronJob;

  constructor(private challengeRepository: IChallengeRepository) {
    const date = '* 0 0 * * *';
    if (
      cron(date, {
        preset: 'npm-cron-schedule',
      }).isValid()
    ) {
      this._cron = new CronJob(date, this.aNewDayArrived(), null, true, 'America/Sao_Paulo');

    } else {
      new Error(cron(date).getError()[0]);
    }
  }

  get cron() {
    return this._cron;
  }

  private aNewDayArrived() {
    //This method will probably have to be changed with the new repository interface
    // this.challengeRepository.findOverdueChallenges().then(challenges =>{
    //   Promise.all(challenges.map(challenge =>{
    //     if(dateDiff(challenge.deadline, new Date()) == 0){
    //       //fazer rebase pra terminar
    //       challenge.updateStatus(ChallengeStatus.Completed)
    //     }

    //   }))
    // })
    return ''
  }
}
