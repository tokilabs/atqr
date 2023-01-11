import { MaxLength, MinLength } from 'class-validator';
import { EmailAddress } from '../EmailService';
import { validate } from '../services/validateOrReject';
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
    super(Contact, Contact[name][email][role]);
    this.name = name;
    this.email = email;
    this.role = role;

    return new Contact(
      (name = this.name),
      (email = this.email),
      (role = this.role)
    );
  }
}
validate(Contact); //uses validateOrReject from class-validator
