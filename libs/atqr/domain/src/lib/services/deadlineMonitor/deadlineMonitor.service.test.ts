import { DeadlineMonitorService } from './';
import { IChallengeRepository } from '../../challenge';
import cron from 'cron-validate';
import { CronJob } from 'cron';

describe('DeadlineMonitorService', () => {
  it('Service should be defined', () => {
    const challengeRepository = {} as IChallengeRepository;
    const service = new DeadlineMonitorService(challengeRepository);
    expect(service).toBeInstanceOf(DeadlineMonitorService);
  });

  it('Cron date should be valid', () => {
    expect(
      cron('* * * * * *', {
        preset: 'npm-cron-schedule',
      }).isValid()
    ).toBe(true);
  });

  it('Cron date should be invalid', () => {
    expect(
      cron('t * e s * t ', {
        preset: 'npm-cron-schedule',
      }).isValid()
    ).toBe(false);
  });

  it('Cronjob should work', () => {
    const mockFn = jest.fn().mockImplementation(() => {
      return 'test';
    });
    let cronJob: CronJob;
    const date = '0 * * * * *';

    if (
      cron(date, {
        preset: 'npm-cron-schedule',
      }).isValid()
    ) {
      cronJob = new CronJob(date, mockFn(), null, false, 'America/Sao_Paulo');
      cronJob.start();
    } else {
      throw new Error(cron(date).getError().join(' '));
    }

    expect(mockFn).toHaveBeenCalled();
  });
});
