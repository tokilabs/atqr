import { ValueObject } from '../../utils/valueObject';
import { Guid } from '@tokilabs/lang';
import { NotificationLogEntry } from './notificationLogEntry.valueObject';
import { MessageTemplateId } from '../services';
import {
  NotificationChannel,
  NotificationCategory,
} from '../types/notification.types';
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
    /**
     * This a calculated property based on
     * (campos que ela usa)
     */
    public readonly isWaitingForUserAction: boolean,
    /**
     * This a calculated property based on
     * (campos que ela usa)
     */
    public readonly sentMessagesCount: number
  ) {
    super(Notification, [
      'id',
      'category',
      'templateId',
      'allowedChannels',
      'createdAt',
      'requiresUserAction',
      'actionTaken',
      'contactLog',
      'nextContactDate',
      'isWaitingForUserAction',
      'sentMessagesCount',
    ]);

    this.createdAt = new Date();
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

  public get setWaitingForUserAction() {
    if (this.actionTaken === false && this.nextContactDate < new Date()) {
      return this.isWaitingForUserAction == true;
    } else {
      return false;
    }
  }

  public get setSentMessagesCount() {
    return this.contactLog.length;
  }
}
