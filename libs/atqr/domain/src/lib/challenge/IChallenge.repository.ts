import { Guid } from '@tokilabs/lang';
import { Challenge } from './';
import { Email } from '../valueObjects';
export interface IChallengeRepository {
  ContenderCreatesTheChallenge(challenge: Challenge): Promise<void>;
  JudgeCreatesTheChallenge(challenge: Challenge): Promise<void>;

  findChallengeById(id: Guid): Promise<Challenge>;
  findChallengeByEmail(email: Email): Promise<Challenge>;
  findLastChallenges(): Promise<Challenge>;
  findManyChallenges(amount: number): Promise<Challenge[]>;
  findOverdueChallenges(): Promise<Challenge[]>;

  challengeStatusChangedToOngoing(id: Guid, challenge: Challenge): Promise<void>;
  challengeStatusChangedToOverdue(id: Guid, challenge: Challenge): Promise<void>;
  challengeStatusChangedToAbandoned(
    id: Guid,
    challenge: Challenge
  ): Promise<void>;
  challengeStatusChangedToCanceled(
    id: Guid,
    challenge: Challenge
  ): Promise<void>;
  challengeStatusChangedToFinished(
    id: Guid,
    challenge: Challenge
  ): Promise<void>;

  inviteeAcceptsPlayChallengeAsContender(
    id: Guid,
    challenge: Challenge
  ): Promise<void>;
  inviteeAcceptsPlayChallengeAsJudge(
    id: Guid,
    challenge: Challenge
  ): Promise<void>;
  ownerAddsNewInvitee(id: Guid, challenge: Challenge): Promise<void>;
  ownerAddsPaymentMethod(id: Guid, challenge: Challenge): Promise<void>;

  contenderRemovedTheJudgeFromChallenge(
    id: Guid,
    challenge: Challenge
  ): Promise<void>;
}

export const IChallengeRepository = Symbol.for('IChallengeRepository');
