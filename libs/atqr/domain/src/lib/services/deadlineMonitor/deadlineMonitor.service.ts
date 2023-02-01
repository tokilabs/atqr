import { IChallengeRepository } from '../../challenge';
import { CronJob } from 'cron';
import cron from 'cron-validate';

export class DeadlineMonitorService {
  constructor(private challengeRepository: IChallengeRepository) {
    const date = '* 0 0 * * *';
    if (
      cron(date, {
        preset: 'npm-cron-schedule',
      }).isValid()
    ) {
      new CronJob(date, this.aNewDayArrived(), null, false, 'America/Sao_Paulo');
    } else {
      throw new Error(cron(date).getError().join(' '));
    }
  }

  aNewDayArrived() {
    return '';
  }
}
