import { CronJob } from 'cron';
import { NotificationService } from '@atqr/domain';

export class DeadlineMonitorService {
  // private _cron: CronJob;

  constructor(private notificationService: NotificationService) {
    const job = () => this.notifyOverdueChallenges();

    new CronJob('* * * 0 * *', job, null, true, 'America/Los_Angeles');
  }

  /**
   * Finds all overdue Challenges and notify them
   */
  private notifyOverdueChallenges() {
    this.notificationService.notifyOverdueChallenges();
  }

}
