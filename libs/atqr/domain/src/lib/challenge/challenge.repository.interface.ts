import { Guid } from '@tokilabs/lang';
import { Challenge, ChallengeStatus } from '.';
import { Player } from '../player';

export interface IChallengeRepository {
  create(data: Challenge);

  ContenderCreateChallenge(challenge: Challenge): Promise<void>;
  JudgeCreateTheChallenge(challenge: Challenge): Promise<void>;

  read(id: Guid, fieldsToRead: Partial<Challenge>): Promise<Challenge[]>;

  findChallengeById(id: Guid): Promise<Challenge[]>;
  getLatestChallengesCreated(amount: number): Promise<Challenge[]>;
  getOverdueChallenges(): Promise<Challenge[]>;

  update(id: Guid, fieldsToUpdate: Partial<Challenge>): Promise<void>;

  addContenderToChallenge(challengeId: Guid, contender: Player): Promise<void>;
  addJudgeToChallenge(challengeId: Guid, judge): Promise<void>;

  addInviteeToChallenge(challengeId: Guid, invitee): Promise<void>;

  inviteeToParticipateAccepted(id: Guid, inviteeStatus): Promise<void>;
  inviteeToParticipateRejected(id: Guid, inviteeStatus): Promise<void>;
  inviteeToParticipateCanceled(id: Guid, inviteeStatus): Promise<void>;

  judgeWasAdded(id: Guid, judgeStatus): Promise<void>;
  judgeOfficiateTheChallenge(id: Guid, judgeStatus): Promise<void>;

  judgmentStatusWasSuccess(id: Guid, judgmentStatus): Promise<void>;
  judgmentStatusWasFailed(id: Guid, judgmentStatus): Promise<void>;

  updatePaymentFundsStatusToUnverified(
    id: Guid,
    paymentFundStatus
  ): Promise<void>;
  updatePaymentFundsStatusToAuthorized(
    id: Guid,
    paymentFundStatus
  ): Promise<void>;
  updatePaymentFundsStatusToDenied(id: Guid, paymentFundStatus): Promise<void>;

  updatePaymentStatusToDefaulted(id: Guid, paymentStatus): Promise<void>;
  updatePaymentStatusToFailed(id: Guid, paymentStatus): Promise<void>;
  updatePaymentStatusToForgiven(id: Guid, paymentStatus): Promise<void>;
  updatePaymentStatusToPaid(id: Guid, paymentStatus): Promise<void>;
  updatePaymentStatusToPending(id: Guid, paymentStatus): Promise<void>;
  updatePaymentStatusToRefunded(id: Guid, paymentStatus): Promise<void>;
  updatePaymentStatusToRefundRequested(id: Guid, paymentStatus): Promise<void>;

  contenderStillPlaying(id: Guid, contenderOutcome): Promise<void>;
  contenderSucceeded(id: Guid, contenderOutcome): Promise<void>;
  contenderFailed(id: Guid, contenderOutcome): Promise<void>;

  recordChallengeSuccess(id: Guid): Promise<void>;
  recordChallengeFailure(id: Guid): Promise<void>;
  recordChallengeCanceled(id: Guid): Promise<void>;

  delete(id: Guid, fieldsToDelete: Partial<Challenge>): Promise<void>;

  removeJudgeFromChallenge(challengeId: Guid, judge): Promise<void>;
}

export const IChallengeRepository = Symbol.for('IChallengeRepository');
