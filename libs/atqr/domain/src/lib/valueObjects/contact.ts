import { MaxLength, MinLength } from 'class-validator';
import { EmailAddress } from './email';
import { ValueObject } from '../../utils/valueObject';
import { ParticipationRole } from '../types';

export class Contact extends ValueObject<Contact> {
  @MinLength(5)
  @MaxLength(20)
  public readonly name: string;
  public readonly email: EmailAddress;
  public readonly role: ParticipationRole;

  constructor(name: string, email: EmailAddress, role: ParticipationRole) {
    super(Contact, ['name', 'email', 'role']);
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public setName(name: string): Contact {
    return this.newInstanceWith({
      name,
    });
  }
  public setEmail(email: EmailAddress): Contact {
    return this.newInstanceWith({
      email,
    });
  }
  public setRole(role: ParticipationRole): Contact {
    return this.newInstanceWith({
      role,
    });
  }
}
