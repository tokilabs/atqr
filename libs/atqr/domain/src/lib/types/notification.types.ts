import { ITemplateDataTypes } from '../services/notification/templateDataType.interface';

export type TemplateDataTypes = {
  [K in keyof ITemplateDataTypes]: ITemplateDataTypes[K];
};

export enum NotificationCategory {
  ProductUpdates = 'ProductUpdates',
  Promotions = 'Promotions',
  NewInvitations = 'NewInvitations',
  ChallengeUpdates = 'ChallengeUpdates',
}

export enum MessageTemplateId {
  ChallengeCreated = 'ChallengeCreated',
  ChallengeCanceled = 'ChallengeCanceled',
  ChallengeOngoing = 'ChallengeOngoing',
  ChallengeCompleted = 'ChallengeCompleted',
  ChallengeFailed = 'ChallengeFailed',
  YourOfficiationHaveBeenRequested = 'YourOfficiationHaveBeenRequested',
  YourOfficiationRequestHaveBeenAccepted = 'YourOfficiationRequestHaveBeenAccepted',
  YourOfficiationRequestHaveBeenRejected = 'YourOfficiationRequestHaveBeenRejected',
  YourOfficiationRequestHaveBeenIgnored = 'YourOfficiationRequestHaveBeenIgnored',
  YouHaveBeenChallenged = 'YouHaveBeenChallenged',
  YourContenderAcceptedTheChallenge = 'YourContenderAcceptedTheChallenge',
  YourContenderRejectedTheChallenge = 'YourContenderRejectedTheChallenge',
  YourContenderIgnoredTheChallenge = 'YourContenderIgnoredTheChallenge',
  YourContenderRemovedYouFromJudgeRole = 'YourContenderRemovedYouFromJudgeRole',
  YourContenderCanceledTheChallenge = 'YourContenderCanceledTheChallenge',
  YourContenderWasSuccessful = 'YourContenderWasSuccessful',
  TimeToOfficiateArrived = 'TimeToOfficiateArrived',
  YourJudgeDidNotAnswered = 'YourJudgeDidNotAnswered',
}

export enum NotificationChannel {
  Email = 'Email',
  SMS = 'SMS',
  Push = 'Push',
}
