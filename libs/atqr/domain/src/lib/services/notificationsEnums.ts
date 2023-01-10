export enum NotificationChannel {
  Email = 'Email',
  SMS = 'SMS',
  Push = 'Push',
}

export enum MessageTemplateId {
  Challenge = 'Challenge',
  YourOfficiationHaveBeenRequested = 'YourOfficiationHaveBeenRequested',
  YourOfficiationRequestHaveBeen = 'YourOfficiationRequestHaveBeen',
  YouHaveBeenChallenged = 'YouHaveBeenChallenged',
  YourContender = 'YourContender',
  TimeToOfficiateArrived = 'TimeToOfficiateArrived',
  YourJudgeDidNotAnswered = 'YourJudgeDidNotAnswered',
}

export enum Challenge {
  Created = 'Created',
  Canceled = 'Canceled',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Failed = 'Failed',
}

export enum YourOfficiationRequestHaveBeen {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Ignored = 'Ignored',
}

export enum YourContender {
  AcceptedTheChallenge = 'AcceptedTheChallenge',
  RejectedTheChallenge = 'RejectedTheChallenge',
  Ignored = 'Ignored',
  RemovedYouFromJudgeRole = 'RemovedYouFromJudgeRole',
  CanceledTheChallenge = 'CanceledTheChallenge',
  WereTheySuccessful = 'WereTheySuccessful',
}


