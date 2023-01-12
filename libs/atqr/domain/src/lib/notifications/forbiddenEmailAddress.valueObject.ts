import { ValueObject } from '../../utils/valueObject';
import { EmailAddress } from '../EmailService/email.interface'

export class ForbiddenEmailAddress extends ValueObject<ForbiddenEmailAddress> {
  private email: EmailAddress;
  private reason: string;
  public createdAt: Date;

  constructor(email: EmailAddress, reason: string, createdAt = new Date() ) {
    super(ForbiddenEmailAddress, [email, reason, createdAt])
  }

  public getEmail(): string {
    return this.email;
  }

  public getReason(): string {
    return this.reason;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public equals(other: ForbiddenEmailAddress): boolean {
    return (
      this.email === other.email &&
      this.reason === other.reason &&
      this.createdAt === other.createdAt
    )
  }

}


