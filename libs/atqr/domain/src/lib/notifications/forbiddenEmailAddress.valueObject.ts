import { ValueObject } from '@atqr/domain';
import { EmailAddress } from '../EmailService/email.interface'

export class ForbiddenEmailAddress extends ValueObject<ForbiddenEmailAddress> {
  private email: EmailAddress;
  private reason: string;
  public createdAt: Date;

  constructor(email: EmailAddress, reason: string, createdAt = new Date() ) {
    super(ForbiddenEmailAddress, Object.keys({email, reason, createdAt}) as (keyof ForbiddenEmailAddress)[])
    this.email = email;
    this.reason = reason;
    this.createdAt = createdAt;
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

}


