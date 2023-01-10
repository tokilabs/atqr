import { NotificationChannel, contentChallenge, contentChallengeAndInvitee } from "../templateMessage";

export interface ITemplateMessage {
  channel: NotificationChannel;
  content: contentChallenge | contentChallengeAndInvitee;
}
