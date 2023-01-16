import { ITemplateDataTypes } from './interfaces/templateDataType.interface';

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
  YourJudgeDidNotAnswered = 'YourJudgeDidNotAnswered',
}
export type TemplateDataTypes = {
  [K in keyof ITemplateDataTypes]: ITemplateDataTypes[K];
};
