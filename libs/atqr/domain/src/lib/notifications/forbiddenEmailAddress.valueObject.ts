import { ValueObject } from '../../utils/valueObject';
import { EmailAddress } from '../EmailService/emailAddress'

export class ForbiddenEmailAddress extends ValueObject<ForbiddenEmailAddress> {
  constructor(
    public readonly email: EmailAddress,
    public readonly reason: string,
    public readonly createdAt = new Date() ) {
    super(ForbiddenEmailAddress, ['email', 'reason', 'createdAt'])
  }

  public setEmail(newEmail: EmailAddress) {
    return this.newInstanceWith({
      email: newEmail
    });
  }

  public setReason(newReason: string) {
    return this.newInstanceWith({
      reason: newReason
    });
  }

  public setCreatedAt(newCreatedAt: Date) {
    return this.newInstanceWith({
      createdAt: newCreatedAt
    });
  }



}


