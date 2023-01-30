import { EventEmitter } from 'events';
import { Officiation } from '../valueObjects/officiation';
import { Enrollment } from '../valueObjects/enrollment';
import { EmailAddress } from '../valueObjects';
import { Challenge } from '../challenge/challenge.entity';
import { PaymentMethod } from '../types/stubs';
import { ParticipationStatus } from '../types';
import { Guid } from '@tokilabs/lang';

type UserId = Guid;
// TODO: Replace mock type by actual type when available
type ChallengeRepository = Record<any, any>;

export class User {
  emitter: EventEmitter;
  id: UserId;
  userName: string;
  email: EmailAddress;
  emailConfirmed: boolean;
  playedChallenges: Enrollment[];
  officiatedChallenges: Officiation[];
  organizedChallenges: Challenge[];
  paymentMethod: PaymentMethod | null;
  challengeRepository: ChallengeRepository;

  // notificationSettings:
  // channels: NotificationChannel[]
  // lists: NotificationList[]

  constructor(userName: string, email: EmailAddress) {
    this.id = new Guid();
    this.userName = userName;
    this.email = email;
    this.challengeRepository = new ChallengeRepository();

    // TODO: Evaluate Pub/Sub libs and implement it when decided
    // this.emitter = new EventEmitter();
    // this.emitter.emit('User Created!');
    // const userEvent = new User(this.userName, this.email);
    // userEvent.emitter.on('User Created!', () => {
    //   console.log('User created successfully');
    // });
  }
  /**
   * Returns all unanswered challenge invitations made by others
   */

  get pendingInvitations(): Challenge[] {
    const challenges: Challenge[] = this.challengeRepository.findByInviteeEmail(
      this.email
    );
    return challenges.filter((challenge: Challenge) =>
      challenge.invitees.some(
        (invitee) =>
          invitee.email === this.email &&
          invitee.status === ParticipationStatus.NotRequested
      )
    );
  }
}
