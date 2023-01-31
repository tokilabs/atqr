import { IChallengeRepository } from '../../challenge';
import { CronJob } from 'cron';
import cron from 'cron-validate';

export class DeadLineMonitorService {
  private _cron: CronJob;
  constructor(private challengeRepository: IChallengeRepository) {
    const date = '* 0 0 * * *';
    if (
      cron(date, {
        preset: 'npm-cron-schedule',
      }).isValid()
    ) {
      this._cron = new CronJob(
        date,
        this.aNewDayArrived(),
        null,
        true,
        'America/Sao_Paulo'
      );
    } else {
      throw new Error(cron(date).getError().join(' '));
    }
  }

  get cron() {
    return this._cron;
  }

  aNewDayArrived() {
    return '';
  }
}
