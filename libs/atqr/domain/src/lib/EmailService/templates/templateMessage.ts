import { ChallengeAndInviteeEnvelope, ChallengeEnvelope } from '../dtos';
import { ITemplateMessage } from './interfaces/templateMessage.interface';

export enum NotificationChannel {
  Email = 'Email',
  SMS = 'SMS',
  Push = 'Push',
}
// create an enum for each type of content
export enum ChallengeEnum {
  Created = 'ChallengeCreated',
  Canceled = 'ChallengeCanceled',
  Ongoing = 'ChallengeOngoing',
  Completed = 'ChallengeCompleted',
  Failed = 'ChallengeFailed',
}
export enum ChallengeAndInviteeEnum {
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
// create a type for each enum
export type contentChallenge = {
  contentChallenge: ChallengeEnum;
  content: ChallengeEnvelope;
};
export type contentChallengeAndInvitee = {
  contentChallengeAndInvitee: ChallengeAndInviteeEnum;
  content: ChallengeAndInviteeEnvelope;
};

/*
  * TemplateMessage is an abstract class that implements ITemplateMessage interface
  * set the channel and content properties
  * EmailTemplate and PushTemplate are concrete classes that extends TemplateMessage
  *
*/
export abstract class TemplateMessage implements ITemplateMessage {
  channel: NotificationChannel;
  content: contentChallenge | contentChallengeAndInvitee;
  constructor(
    channel: NotificationChannel,
    content: contentChallenge | contentChallengeAndInvitee
  ) {
    this.channel = channel;
    this.content = content;
  }
}

export class EmailTemplate extends TemplateMessage {
  subject: string;
  constructor(
    subject: string,
    content: contentChallenge | contentChallengeAndInvitee
  ) {
    super(NotificationChannel.Email, content);
    this.subject = subject;
  }
}

export class PushTemplate extends TemplateMessage {
  constructor(content: contentChallenge | contentChallengeAndInvitee) {
    super(NotificationChannel.Push, content);
  }
}
