import { DeadLineMonitorService1 } from './deadlineMonitor.service';
import { IChallengeRepository } from '../../challenge';
import cron from 'cron-validate';
import { CronJob } from 'cron';
import { dateDiff } from '../../../utils/dateDifference';

describe('DeadlineMonitorService', () => {
  const challengeRepository = {} as IChallengeRepository;

  it('should be defined', () => {
    expect(new DeadLineMonitorService1(challengeRepository)).toBeDefined();
  });

  it('should be valid', () => {
    expect(
      cron('* * * * * *', {
        preset: 'npm-cron-schedule',
      }).isValid()
    ).toBe(true);
  });

  it('should be invalid', () => {
    expect(
      cron('t * e s * t ', {
        preset: 'npm-cron-schedule',
      }).isValid()
    ).toBe(false);
  });
  it('Dates should not be the same', () => {
    const oldDate = new Date()
    oldDate.setFullYear(2021)
    const newDate = new Date()

    expect(dateDiff(oldDate, newDate)).toBeGreaterThan(0)
  });
});
