import { MaxLength, MinLength } from 'class-validator';
import { EmailAddress } from '../EmailService';
import { ValueObject } from '../../utils/valueObject';

export enum ParticipationRole {
  Contender,
  Judge,
}
export class Contact extends ValueObject<Contact> {
  @MinLength(5)
  @MaxLength(20)
  name: string;
  email: EmailAddress;
  role: ParticipationRole;

  constructor(name: string, email: EmailAddress, role: ParticipationRole) {
    super(Contact, ['name', 'email', 'role']);
    this.name = name
    this.email = email
    this.role = role
  }

  public setName(newName: string): Contact {
    return this.newInstanceWith({
      name: newName,
    });
  }
  public setEmail(newEmail: EmailAddress): Contact {
    return this.newInstanceWith({
      email: newEmail,
    });
  }
  public setRole(newRole: ParticipationRole): Contact {
    return this.newInstanceWith({
      role: newRole,
    });
  }
}
