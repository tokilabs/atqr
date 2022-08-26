import { Exception } from '@tokilabs/lang';
import { CronJob } from 'cron';
import { NotificationService } from './notification.service';

export class DeadlineMonitorService {

  constructor(private notificationService: NotificationService) {
    const job = () => this.notifyOverdueChallenges();

    new CronJob('* 0 9 * * *', job, null, true, 'America/Sao_Paulo');
    new CronJob('* 0 12 * * *', job, null, true, 'America/Sao_Paulo');
    new CronJob('* 0 18 * * *', job, null, true, 'America/Sao_Paulo');
    // NOTE: Pattern changed from * * * 0 * *, since it has 6 digits and wont allow module to compile
    // TODO: Rewrite cron pattern

    new CronJob('0 0 * * *', job, null, true, 'America/Los_Angeles'); // implement error
  }

  /**
   * Finds all overdue Challenges and notify them
   */
  private notifyOverdueChallenges() {
    try {
      this.notificationService.notifyOverdueChallenges();
    } catch {
      Exception;
      throw Exception;
    } // implement error condition
  }
}
