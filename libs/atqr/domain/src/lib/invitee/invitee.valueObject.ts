import { Contact } from '../contact/contact.valueObject';
import { validate } from '../services/validateOrReject';

abstract class ValueObject<Invitee> {
  type: Invitee;
  value: string;
}
enum ParticipationStatus {
  NotRequested,
  Requested,
  Accepted,
  Rejected,
  Ignored,
  CanceledByContender,
}
class Invitee extends ValueObject<Contact> {
  status: ParticipationStatus;

  constructor(status: ParticipationStatus.NotRequested) {
    super();
    this.status = status;

    return new Invitee((status = this.status));
  }
}
validate(Invitee); //uses validateOrReject from class-validator
