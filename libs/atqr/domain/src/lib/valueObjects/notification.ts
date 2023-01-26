import { ValueObject } from '../../utils/valueObject';
import { Guid } from '@tokilabs/lang';
import { NotificationLogEntry } from './notificationLogEntry.valueObject';
import { MessageTemplateId } from '../services';

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
  constructor(
    public readonly id: Guid,
    public readonly category: NotificationCategory,
    public readonly templateId: MessageTemplateId,
    public readonly allowedChannels: NotificationChannel[],
    public readonly createdAt: Date,
    public readonly requiresUserAction: boolean,
    public readonly actionTaken: boolean,
    public readonly contactLog: NotificationLogEntry[],
    public readonly nextContactDate: Date,
    public readonly waitingForUserAction: boolean,
    public messagesSent: number
  ) {
    super(Notification, [
      'category',
      'templateId',
      'allowedChannels',
      'createdAt',
      'requiresUserAction',
      'actionTaken',
      'contactLog',
      'nextContactDate',
      'waitingForUserAction',
      'messagesSent',
    ]);

    this.id = new Guid();
  }

  IsWaitingForUserAction(waitingForUserAction: boolean): boolean {
    if (this.actionTaken === false && this.nextContactDate < new Date()) {
      return waitingForUserAction == true;
    } else {
      return false;
    }
  }

  MessagesSent(): number {
    return (this.messagesSent = this.contactLog.length);
  }

  public setId(id: Guid): Notification {
    return this.newInstanceWith({
      id,
    });
  }

  public setCategory(category: NotificationCategory): Notification {
    return this.newInstanceWith({
      category,
    });
  }

  public setTemplateId(templateId: MessageTemplateId): Notification {
    return this.newInstanceWith({
      templateId,
    });
  }

  public setAllowedChannels(
    allowedChannels: NotificationChannel[]
  ): Notification {
    return this.newInstanceWith({
      allowedChannels,
    });
  }

  public setCreatedAt(createdAt: Date): Notification {
    return this.newInstanceWith({
      createdAt,
    });
  }

  public setRequiresUserAction(requiresUserAction: boolean): Notification {
    return this.newInstanceWith({
      requiresUserAction,
    });
  }

  public setActionTaken(actionTaken: boolean): Notification {
    return this.newInstanceWith({
      actionTaken,
    });
  }
  public setContactLog(contactLog: NotificationLogEntry[]): Notification {
    return this.newInstanceWith({
      contactLog,
    });
  }
  public setNextContactDate(nextContactDate: Date): Notification {
    return this.newInstanceWith({
      nextContactDate,
    });
  }
}
