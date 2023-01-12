import { ValueObject } from '@atqr/domain';
import { Guid } from '@tokilabs/lang';
import { NotificationLogEntry } from './notificationLogEntry.valueObject';
import { isBeforeDay } from '../../utils/isBeforeDay';

enum NotificationCategory {
  EuDuvidoProductUpdates = 'EuDuvidoProductUpdates',
  EuDuvidoPromotions = 'EuDuvidoPromotions',
  NewInvitations = 'NewInvitations',
  ChallengeUpdates = 'ChallengeUpdates',
}

export enum NotificationChannel {
  Email = 'Email',
  SMS = 'SMS',
  Push = 'Push',
}

export class Notification extends ValueObject<Notification> {
  private id: Guid;

  constructor(
    private category: NotificationCategory,
    private templateId: MessageTemplateId,
    private allowedChannels: NotificationChannel[],
    private createdAt: Date,
    private requiresUserAction: boolean,
    private actionTaken: boolean,
    private contactLog: NotificationLogEntry[],
    private nextContactDate: Date
  ) {
    super(Notification, [
      category,
      templateId,
      allowedChannels,
      createdAt,
      requiresUserAction,
      actionTaken,
      contactLog,
      nextContactDate,
    ]);

    this.id = new Guid();
  }

  getId() {
    return this.id;
  }

  getCategory() {
    return this.category;
  }

  getTemplateId() {
    return this.templateId;
  }

  getAllowedChannels() {
    return this.allowedChannels;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getRequiresUserAction() {
    return this.requiresUserAction;
  }

  getActionTaken() {
    return this.actionTaken;
  }

  getNextContactDate() {
    return this.nextContactDate;
  }

  getContactLog() {
    return this.contactLog;
  }

  waitingForUserAction(date: Date): boolean {
    if (this.actionTaken === false && isBeforeDay(this.nextContactDate, date)) {
      return true;
    } else {
      return false;
    }
  }

  messageSent() {
    return this.contactLog.length;
  }

  public equals(other: Notification): boolean {
    return (
      this.id === other.id &&
      this.category === other.category &&
      this.templateId === other.templateId &&
      this.allowedChannels === other.allowedChannels &&
      this.createdAt === other.createdAt &&
      this.requiresUserAction === other.requiresUserAction &&
      this.actionTaken === other.actionTaken &&
      this.contactLog === other.contactLog &&
      this.nextContactDate === other.nextContactDate
    );
  }
}
