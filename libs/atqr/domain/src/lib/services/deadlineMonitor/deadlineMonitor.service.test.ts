import { DeadLineMonitorService } from './deadlineMonitor.service';
import { IChallengeRepository } from '../../challenge';
import cron from 'cron-validate';
import { CronJob } from 'cron';
import { dateDiff } from '../../../utils/dateDifference';

describe('DeadlineMonitorService', () => {
  const challengeRepository = {} as IChallengeRepository;
  const mockAnewDayArrived = jest.fn();

  const date = '* 0 0 * * *';
  const cronJob = new CronJob(
    date,
    mockAnewDayArrived,
    null,
    true,
    'America/Sao_Paulo'
  );

  it('should be defined', () => {
    expect(new DeadLineMonitorService(challengeRepository)).toBeDefined();
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
  // it('Dates should not be the same', () => {
  //   const oldDate = new Date();
  //   oldDate.setFullYear(2022);
  //   const newDate = new Date();
  //   expect(dateDiff(oldDate, newDate)).toBeGreaterThan(0);
  // });

  // it('should be instanceOf', () => {
  //   expect(cronJob).toBeInstanceOf(CronJob);
  // });
  it('CronJob should call method aNewDayArrived', () => {
    expect(mockAnewDayArrived).toBeCalled()
  });
});
