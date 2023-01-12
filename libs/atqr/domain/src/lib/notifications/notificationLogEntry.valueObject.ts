import { ValueObject } from '../../utils/valueObject';
import { Guid } from '@tokilabs/lang';
import { NotificationChannel } from './notification.valueObject';

export class NotificationLogEntry extends ValueObject<NotificationLogEntry> {
  constructor(
    public readonly notification: Notification,
    public readonly channel: NotificationChannel,
    public readonly to: User,
    public readonly visualized: boolean,
    public readonly sentAt = new Date(),
    public readonly id = new Guid(),
  ) {
    super(NotificationLogEntry, ['notification', 'channel', 'to', 'visualized']);
  }

  public setId(newId: Guid) {
    return this.newInstanceWith({
      id: newId
    });
  }

  public setNotification(newNotification: Notification) {
    return this.newInstanceWith({
      notification: newNotification
    });
  }

  public setChannel(newChannel: NotificationChannel) {
    return this.newInstanceWith({
      channel: newChannel
    });
  }

  public setSentAt(newSentAt: Date) {
    return this.newInstanceWith({
      sentAt: newSentAt
    });
  }

  public setTo(newTo: User) {
    return this.newInstanceWith({
      to: newTo
    });
  }

  public setVisualized(newVisualized: boolean) {
    return this.newInstanceWith({
      visualized: newVisualized
    })
  }
}
