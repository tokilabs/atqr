import { EventEmitter } from 'events';
import { Officiation } from '../valueObjects/officiation';
import { Enrollment } from '../valueObjects/enrollment';
import { EmailAddress } from '../valueObjects';
import { Challenge } from '../challenge/challenge.entity';
import { PaymentMethod } from '../types/stubs';

export class User {
  emitter: EventEmitter;
  id: UserId;
  userName: string;
  email: EmailAddress;
  emailConfirmed: boolean;
  playedChallenges: Enrollment[];
  officiatedChallenges: Officiation[];
  organizedChallenges: Challenge[];
  paymentMethod: PaymentMethod | null

  // notificationSettings:
  // channels: NotificationChannel[]
  // lists: NotificationList[]

  constructor(userName: string, email: EmailAddress) {
    this.id = new UserId();
    this.userName = userName;
    this.email = email;
    this.emitter = new EventEmitter();
    this.emitter.emit('User Created!');
    const userEvent = new User(this.userName,this.email);
    userEvent.emitter.on('User Created!', () => {
    console.log('User created successfully');
    });
  }
  /**
   * Returns all unanswered challenge invitations made by others
   */
  

  get Invitations() {
    return (challenge: Challenge[]) => challenge.filter((challenge) =>
      challenge.invitees.some(
        (invitee) =>
          invitee.email === this.email &&
          invitee.status === ParticipationStatus.NotRequested
      )
    );
  }
}






