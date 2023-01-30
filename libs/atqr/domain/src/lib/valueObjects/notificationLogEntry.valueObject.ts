import { ValueObject } from '../../utils/valueObject';
import { NotificationChannel } from '../types/notification.types';
import { User } from '@atqr/domain/user';

export class NotificationLogEntry extends ValueObject<NotificationLogEntry> {
  public get id() {
    return this._hash;
  }

  constructor(
    public readonly notification: Notification,
    public readonly channel: NotificationChannel,
    public readonly sentAt: Date,
    public readonly to: User,
    public readonly isSeen: boolean
  ) {
    super(NotificationLogEntry, [
      'notification',
      'channel',
      'sentAt',
      'to',
      'isSeen',
    ]);

    this.excludeFromEquals = ['id'];
  }

  public equals(other: NotificationLogEntry): boolean {
    return this.hashEquals(other);
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
