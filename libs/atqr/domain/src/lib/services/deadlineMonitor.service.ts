import { CronJob } from 'cron';
import { NotificationService } from './notification.service';

export class DeadlineMonitorService {
  // private _cron: CronJob;

  constructor(private notificationService: NotificationService) {
    const job = () => this.notifyOverdueChallenges();

    // NOTE: Pattern changed from * * * 0 * *, since it has 6 digits and wont allow module to compile
    // TODO: Rewrite cron pattern

    new CronJob('0 0 * * *', job, null, true, 'America/Los_Angeles');
  }

  /**
   * Finds all overdue Challenges and notify them
   */
  private notifyOverdueChallenges() {
    this.notificationService.notifyOverdueChallenges();
  }
}
