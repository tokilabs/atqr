import { ValueObject } from '../../utils/valueObject';
import { EmailAddress } from './email';

export class ForbiddenEmailAddress extends ValueObject<ForbiddenEmailAddress> {
  
  constructor(
    public readonly email: EmailAddress,
    public readonly reason: string,
    public readonly createdAt: Date = new Date()
  ) {
    super(ForbiddenEmailAddress, ['email', 'reason', 'createdAt']);
  }

  public setName(email: EmailAddress): ForbiddenEmailAddress {
    return this.newInstanceWith({
      email,
    });
  }
  
  public setEmail(reason: string): ForbiddenEmailAddress {
    return this.newInstanceWith({
      reason,
    });
  }

  public setRole(createdAt: Date): ForbiddenEmailAddress {
    return this.newInstanceWith({
      createdAt,
    });
  }
}
