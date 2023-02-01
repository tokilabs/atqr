import { ValueObject } from '../../utils';
import { today } from '@tokilabs/lang';
import { NotificationLogEntry } from './notificationLogEntry.valueObject';
import { MessageTemplateId } from '../services';
import { NotificationChannel, NotificationCategory } from '../services';
export class Notification extends ValueObject<Notification> {
  /**
   * This a calculated property based on
   *
   */
  public get isWaitingForUserAction() {
    return this.actionTaken === false && this.nextContactDate < today();
  }
  /**
   * This a calculated property based on
   *
   */
  public get sentMessagesCount() {
    return this.contactLog.length;
  }

  public get id() {
    return this._hash;
  }

  constructor(
    public readonly category: NotificationCategory,
    public readonly templateId: MessageTemplateId,
    public readonly allowedChannels: NotificationChannel[],
    public readonly requiresUserAction: boolean,
    public readonly actionTaken: boolean,
    public readonly contactLog: NotificationLogEntry[],
    public readonly nextContactDate: Date,
    public readonly createdAt: Date = today()
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
      'isWaitingForUserAction',
      'sentMessagesCount',
    ]);

    this.excludeFromEquals = [
      'id',
      'isWaitingForUserAction',
      'sentMessagesCount',
    ];
  }

  public equals(other: Notification): boolean {
    return this.hashEquals(other);
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
