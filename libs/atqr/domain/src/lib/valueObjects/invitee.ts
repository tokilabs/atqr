import { Contact } from './contact';
import { ValueObject } from '../../utils/valueObject';
import { EmailAddress } from './emailAddress';
import { ParticipationRole, ParticipationStatus } from '../types';

interface IInvitee extends Contact {
  status: ParticipationStatus;
}
export class Invitee extends ValueObject<Invitee> implements IInvitee {
  constructor(
    public readonly status: ParticipationStatus,
    public readonly name: string,
    public readonly email: EmailAddress,
    public readonly role: ParticipationRole
  ) {
    super(Invitee, ['status']);
  }
  public setName(name: string): Invitee {
    return this.newInstanceWith({
      name,
    });
  }
  public setEmail(email: EmailAddress): Invitee {
    return this.newInstanceWith({
      email,
    });
  }
  public setRole(role: ParticipationRole): Invitee {
    return this.newInstanceWith({
      role,
    });
  }
}
