import { ValueObject } from '../../utils/valueObject';
import { Guid } from '@tokilabs/lang';
import { NotificationChannel } from './notification';

export class NotificationLogEntry extends ValueObject<NotificationLogEntry> {
  constructor(
    public readonly id: Guid,
    public readonly sentAt: Date,
    public readonly notification: Notification,
    public readonly channel: NotificationChannel,
    public readonly to: User,
    public readonly visualized: boolean
  ) {
    super(NotificationLogEntry, [
      'id',
      'sentAt',
      'notification',
      'channel',
      'to',
      'visualized',
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
  public setVisualized(visualized: boolean): NotificationLogEntry {
    return this.newInstanceWith({
      visualized,
    });
  }
}
