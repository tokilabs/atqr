import { Guid } from '@tokilabs/lang';
import { Challenge } from './';
import { Player } from '../player';
import { Invitee } from '../valueObjects';
import {
  ContenderOutcome,
  ParticipationStatus,
  JudgmentStatus,
} from '../types';
import { PaymentStatus, PaymentFundsStatus } from '../PaymentMethod/enums';
export interface IChallengeRepository {
  create(data: Challenge): Promise<void>;

  ContenderCreateChallenge(challenge: Challenge): Promise<void>;
  JudgeCreateTheChallenge(challenge: Challenge): Promise<void>;

  read(id: Guid, fieldsToRead: Partial<Challenge>): Promise<Challenge[]>;

  findChallengeById(id: Guid): Promise<Challenge[]>;
  getLatestChallengesCreated(amount: number): Promise<Challenge[]>;
  getOverdueChallenges(): Promise<Challenge[]>;

  update(id: Guid, fieldsToUpdate: Partial<Challenge>): Promise<void>;

  addContenderToChallenge(challengeId: Guid, contender: Player): Promise<void>;
  addJudgeToChallenge(challengeId: Guid, judge): Promise<void>;

  addInviteeToChallenge(challengeId: Guid, invitee: Invitee): Promise<void>;

  inviteeToParticipateAccepted(
    id: Guid,
    inviteeStatus: ParticipationStatus
  ): Promise<void>;
  inviteeToParticipateRejected(
    id: Guid,
    inviteeStatus: ParticipationStatus
  ): Promise<void>;
  inviteeToParticipateCanceled(
    id: Guid,
    inviteeStatus: ParticipationStatus
  ): Promise<void>;

  judgeWasAdded(id: Guid, judgeStatus: JudgmentStatus): Promise<void>;
  judgeOfficiateTheChallenge(
    id: Guid,
    judgeStatus: JudgmentStatus
  ): Promise<void>;

  judgmentStatusWasSuccess(
    id: Guid,
    judgmentStatus: JudgmentStatus
  ): Promise<void>;
  judgmentStatusWasFailed(
    id: Guid,
    judgmentStatus: JudgmentStatus
  ): Promise<void>;

  updatePaymentFundsStatusToUnverified(
    id: Guid,
    paymentFundStatus: PaymentFundsStatus
  ): Promise<void>;
  updatePaymentFundsStatusToAuthorized(
    id: Guid,
    paymentFundStatus
  ): Promise<void>;
  updatePaymentFundsStatusToDenied(id: Guid, paymentFundStatus): Promise<void>;

  updatePaymentStatusToDefaulted(
    id: Guid,
    paymentStatus: PaymentStatus
  ): Promise<void>;
  updatePaymentStatusToFailed(
    id: Guid,
    paymentStatus: PaymentStatus
  ): Promise<void>;
  updatePaymentStatusToForgiven(
    id: Guid,
    paymentStatus: PaymentStatus
  ): Promise<void>;
  updatePaymentStatusToPaid(
    id: Guid,
    paymentStatus: PaymentStatus
  ): Promise<void>;
  updatePaymentStatusToPending(
    id: Guid,
    paymentStatus: PaymentStatus
  ): Promise<void>;
  updatePaymentStatusToRefunded(
    id: Guid,
    paymentStatus: PaymentStatus
  ): Promise<void>;
  updatePaymentStatusToRefundRequested(
    id: Guid,
    paymentStatus: PaymentStatus
  ): Promise<void>;

  contenderStillPlaying(
    id: Guid,
    contenderOutcome: ContenderOutcome
  ): Promise<void>;
  contenderSucceeded(
    id: Guid,
    contenderOutcome: ContenderOutcome
  ): Promise<void>;
  contenderFailed(id: Guid, contenderOutcome: ContenderOutcome): Promise<void>;

  recordChallengeSuccess(id: Guid): Promise<void>;
  recordChallengeFailure(id: Guid): Promise<void>;
  recordChallengeCanceled(id: Guid): Promise<void>;

  delete(id: Guid, fieldsToDelete: Partial<Challenge>): Promise<void>;

  removeJudgeFromChallenge(challengeId: Guid, judge): Promise<void>;
}

export const IChallengeRepository = Symbol.for('IChallengeRepository');
