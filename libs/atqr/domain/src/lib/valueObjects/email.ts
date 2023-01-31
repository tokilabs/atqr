import { ValueObject } from '../../utils';
import { EmailAddress } from './';

export class Email extends ValueObject<Email> {
  constructor(
    public readonly to: EmailAddress,
    public readonly subject: string,
    public readonly message?: string
  ) {
    super(Email, ['to', 'subject', 'message']);
  }

  setEmailAddress(to: EmailAddress) {
    return this.newInstanceWith({ to });
  }

  setSubject(subject: string) {
    return this.newInstanceWith({ subject });
  }

  setMessage(message: string) {
    return this.newInstanceWith({ message });
  }
}
