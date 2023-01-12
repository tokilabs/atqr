import { ValueObject } from '../../utils/valueObject';
import { Guid } from '@tokilabs/lang';
import { NotificationChannel } from './notification.valueObject';

export class NotificationLogEntry extends ValueObject<NotificationLogEntry> {
  private id: Guid;
  private sentAt: Date;

  constructor(
    private notification: Notification,
    private channel: NotificationChannel,
    private to: User,
    private visualized: boolean
  ) {
    super(NotificationLogEntry, [notification, channel, to, visualized]);

    this.id = new Guid();
    this.sentAt = new Date();
  }

  getId() {
    return this.id;
  }

  getNotification() {
    return this.notification;
  }

  getChannel() {
    return this.channel;
  }

  getSentAt() {
    return this.sentAt;
  }

  getTo() {
    return this.to;
  }

  getVisualized() {
    return this.visualized;
  }

  public equals(other: NotificationLogEntry): boolean {
    return super.equals(other);
  }

  protected newInstanceWith(updatedProps: NotificationLogEntry): NotificationLogEntry {
    return super.newInstanceWith(updatedProps);
  }

}
