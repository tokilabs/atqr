import { ITemplateDataTypes } from './interfaces/templateDataType.interface';

export type TemplateDataTypes = {
  [K in keyof ITemplateDataTypes]: ITemplateDataTypes[K];
};

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
  YourContenderIgnored = 'YourContenderIgnored',
  YourContenderRemovedYouFromJudgeRole = 'YourContenderRemovedYouFromJudgeRole',
  YourContenderCanceledTheChallenge = 'YourContenderCanceledTheChallenge',
  YourContenderWereTheySuccessful = 'YourContenderWereTheySuccessful',
  ReminderToOfficiate = 'ReminderToOfficiate',
  YourJudgeDidNotAnswer = 'YourJudgeDidNotAnswer',
}

export enum NotificationChannel {
  Email = 'Email',
  SMS = 'SMS',
  Push = 'Push',
}

export enum NotificationCategory {
  ProductUpdates = 'ProductUpdates',
  Promotions = 'Promotions',
  NewInvitations = 'NewInvitations',
  ChallengeUpdates = 'ChallengeUpdates',
}
