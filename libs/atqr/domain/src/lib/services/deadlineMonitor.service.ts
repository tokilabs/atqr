import { CronJob } from 'cron';
import { NotificationService } from './notification/notification.service';

export class DeadlineMonitorService {

  constructor(private notificationService: NotificationService) {
    const job = () => this.notifyOverdueChallenges();

    new CronJob('* 0 9 * * *', job, null, true, 'America/Sao_Paulo');
    new CronJob('* 0 12 * * *', job, null, true, 'America/Sao_Paulo');
    new CronJob('* 0 18 * * *', job, null, true, 'America/Sao_Paulo');
  }

  /**
   * Finds all overdue Challenges and notify them
   */
  private notifyOverdueChallenges() {
    this.notificationService.notifyOverdueChallenges();
  }
}
