import { ValueObject } from '@atqr/domain';
import { Guid } from '@tokilabs/lang';
import { NotificationLogEntry } from './notificationLogEntry.valueObject';
import { isBeforeDay } from '../../utils/isBeforeDay';

export class Notification extends ValueObject<Notification> {
  constructor(
    public readonly id = new Guid(),
    public readonly category: NotificationCategory,
    public readonly templateId: MessageTemplateId,
    public readonly allowedChannels: NotificationChannel[],
    public readonly createdAt: Date,
    public readonly requiresUserAction: boolean,
    public readonly actionTaken: boolean,
    public readonly contactLog: NotificationLogEntry[],
    public readonly nextContactDate: Date,
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
    ]);
  }

  public setId(newId: Guid) {
    return this.newInstanceWith({
      id: newId
    });
  }

  public setCategory(newCategory: NotificationCategory) {
    return this.newInstanceWith({
      category: newCategory
    });
  }

  public setTemplateId(newTemplateId: MessageTemplateId) {
    return this.newInstanceWith({
      templateId: newTemplateId
    });
  }

  public setAllowedChannels(newAllowedChannels: NotificationChannel[]) {
    return this.newInstanceWith({
      allowedChannels: newAllowedChannels
    });
  }

  public setCreatedAt(newCreatedAt: Date) {
    return this.newInstanceWith({
      createdAt: newCreatedAt
    });
  }

  public setRequiresUserAction(newRequiresUserAction:boolean) {
    return this.newInstanceWith({
      requiresUserAction: newRequiresUserAction
    });
  }

  public setActionTaken(newActionTaken: boolean) {
    return this.newInstanceWith({
      actionTaken: newActionTaken
    });
  }

  public setNextContactDate(newNextContactDate: Date) {
    return this.newInstanceWith({
      nextContactDate: newNextContactDate
    });
  }

  public setContactLog(newContactLog: NotificationLogEntry[]) {
    return this.newInstanceWith({
      contactLog: newContactLog
    });
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
}
