import { ValueObject } from '../../utils/valueObject';
import { Guid } from '@tokilabs/lang';
import { NotificationChannel } from '../types/notification.types';
export class NotificationLogEntry extends ValueObject<NotificationLogEntry> {
  constructor(
    public readonly id: Guid,
    public readonly sentAt: Date,
    public readonly notification: Notification,
    public readonly channel: NotificationChannel,
    public readonly to: User,
    public readonly isSeen: boolean
  ) {
    super(NotificationLogEntry, [
      'id',
      'sentAt',
      'notification',
      'channel',
      'to',
      'isSeen',
    ]);
    this.id = new Guid();
    this.sentAt = new Date();
  }
  public setId(id: Guid): NotificationLogEntry {
    return this.newInstanceWith({
      id,
    });
  }
  public setSentAt(sentAt: Date): NotificationLogEntry {
    return this.newInstanceWith({
      sentAt,
    });
  }
  public setNotification(notification: Notification): NotificationLogEntry {
    return this.newInstanceWith({
      notification,
    });
  }
  public setChannel(channel: NotificationChannel): NotificationLogEntry {
    return this.newInstanceWith({
      channel,
    });
  }
  public setTo(to: User): NotificationLogEntry {
    return this.newInstanceWith({
      to,
    });
  }
  public setSeen(isSeen: boolean): NotificationLogEntry {
    return this.newInstanceWith({
      isSeen,
    });
  }
}
