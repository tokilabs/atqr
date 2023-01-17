export enum ChallengeStatus {
  Unverified = 'Unverified',
  Ongoing = 'Ongoing',
  Overdue = 'Overdue',
  Abandoned = 'Abandoned',
  Canceled = 'Canceled',
  Finished = 'Finished'
}

export enum ContenderOutcome {
  StillPlaying = 'StillPlaying',
  Succeeded = 'Succeeded',
  Failed = 'Failed'
}

export enum ParticipationStatus {
  NotRequested = 'NotRequested',
  Requested = 'Requested',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Ignored = 'Ignored',
  CanceledByContender = 'CanceledByContender'
}

export enum JudgmentStatus {
  NotDueYet = 'NotDueYet',
  NotRequested = 'NotRequested',
  Requested = 'Requested',
  Ignored = 'Ignored',
  Judged = 'Judged'
}

export enum ParticipationRole {
  Contender = 'Contender',
  Judge = 'Judge'
}
