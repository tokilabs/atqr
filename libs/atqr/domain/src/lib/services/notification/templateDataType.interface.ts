import {
  ChallengeAndInviteeEnvelope,
  ChallengeEnvelope,
} from '../../EmailService/dtos';
import { MessageTemplateId } from './notification.types';

export interface ITemplateDataTypes extends Record<MessageTemplateId, object> {
  [MessageTemplateId.ChallengeCreated]: ChallengeEnvelope;
  [MessageTemplateId.ChallengeCanceled]: ChallengeEnvelope;
  [MessageTemplateId.ChallengeOngoing]: ChallengeEnvelope;
  [MessageTemplateId.ChallengeCompleted]: ChallengeEnvelope;
  [MessageTemplateId.ChallengeFailed]: ChallengeEnvelope;
  [MessageTemplateId.YourOfficiationHaveBeenRequested]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourOfficiationRequestHaveBeenAccepted]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourOfficiationRequestHaveBeenRejected]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourOfficiationRequestHaveBeenIgnored]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YouHaveBeenChallenged]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourContenderAcceptedTheChallenge]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourContenderRejectedTheChallenge]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourContenderIgnored]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourContenderRemovedYouFromJudgeRole]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourContenderCanceledTheChallenge]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourContenderWereTheySuccessful]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.ReminderToOfficiate]: ChallengeAndInviteeEnvelope;
  [MessageTemplateId.YourJudgeDidNotAnswer]: ChallengeAndInviteeEnvelope;
}
