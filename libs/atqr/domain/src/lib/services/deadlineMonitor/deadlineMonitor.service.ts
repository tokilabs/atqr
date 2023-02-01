import { IChallengeRepository } from '../../challenge';
import { CronJob } from 'cron';
import cron from 'cron-validate';

export class DeadlineMonitorService {
  private _cronJob: CronJob;

  constructor(private challengeRepository: IChallengeRepository) {
    const date = '* 0 0 * * *';
    if (
      cron(date, {
        preset: 'npm-cron-schedule',
      }).isValid()
    ) {
      this._cronJob = new CronJob(
        date,
        this.aNewDayArrived(),
        null,
        false,
        'America/Sao_Paulo'
      );
    } else {
      throw new Error(cron(date).getError().join(' '));
    }
  }

  get cronJob() {
    return this._cronJob;
  }

  aNewDayArrived() {
    return '';
  }
}
