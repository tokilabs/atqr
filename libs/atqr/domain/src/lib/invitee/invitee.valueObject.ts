import { Contact, ParticipationRole } from '../contact/contact.valueObject';
import { validate } from '../services/validateOrReject';
import { ValueObject } from '../../utils/valueObject';
import { EmailAddress } from '../EmailService';

enum ParticipationStatus {
  NotRequested,
  Requested,
  Accepted,
  Rejected,
  Ignored,
  CanceledByContender,
}
interface IInvitee extends Contact {
  status: ParticipationStatus;
}
class Invitee extends ValueObject<Invitee> implements IInvitee {
  status: ParticipationStatus;
  name: string;
  email: EmailAddress;
  role: ParticipationRole;

  constructor(status: ParticipationStatus) {
    super(Invitee, Invitee[status]);
    return new Invitee(status);
  }
}
validate(Invitee); //uses validateOrReject from class-validator
