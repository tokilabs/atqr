import { Guid } from '@tokilabs/lang/';
import { Transform } from 'class-transformer';
import { dateDiff } from '../../utils/dateDifference';
import { EmailAddress } from '../EmailService';
import { PaymentMethodEntity } from '../PaymentMethod';
//import { Player } from '../player/player.entity';

export enum SupervisorEnum {
  notInvited = 'notInvited',
  invited = 'invited',
  accepted = 'accepted',
  rejected = 'rejected',
  askedIfTheGoalIsAccomplished = 'askedIfTheGoalIsAccomplished',
  repliedIfTheGoalWasAccomplished = 'repliedIfTheGoalWasAccomplished',
  repliedIfTheGoalWasNotAccomplished = 'repliedIfTheGoalWasNotAccomplished',
}

export enum ChallengeStatus {
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Failed = 'Failed',
  Overdue = 'Overdue',
}
export class Challenge {
  private _id: Guid;
  private _price: number;
  private _deadline: Date;
  @Transform(({ value }) => ChallengeStatus[value])
  private _status?: ChallengeStatus;

  constructor(
    private _goalId: GoalId,
    private _owner: User,
    private _invitees: Invitee[],
    private _deadline: Date,
    private _pledge: number,
    private _requiredProof?: string,
    private _enrollmentDeadline: Date,
    private _inviteByLink: boolean
  ) {
    // challengeId is in challenge's updated proprieties on issue 120, already pull requested
    this._goalId = new GoalId();
    if (_pledge >= 25) {
      this._pledge = _pledge;
    } else {
      throw new Error('Selecione um valor acima de 25 reais');
    }
    const today = new Date();
    if (dateDiff(today, _deadline) > 1) {
      this._deadline = _deadline;
    } else {
      throw Error('Selecione uma data futura');
    }
    if (dateDiff(_deadline, _enrollmentDeadline) < 1) {
      this._deadline = _enrollmentDeadline;
    } else {
      throw Error('_enrollmentDeadline has to be before _deadline');
    }
  }
  get goalId() {
    return this._goalId;
  }
  get goal() {
    return this._goal;
  }
  public get status() {
    return this._status;
  }
  get deadline() {
    return this._deadline;
  }
  get price() {
    return this._price;
  }

  get supervisorStatus() {
    return this._supervisorStatus;
  }
  get supervisorName() {
    return this._supervisorName;
  }
  get supervisorEmail() {
    return this._supervisorEmail;
  }
  get player() {
    return this._player;
  }
  get paymentMethod() {
    return this._paymentMethod;
  }
  changeSupervisor(
    newSupervisorName: string,
    newSupervisorEmail: EmailAddress
  ) {
    this._supervisorName = newSupervisorName;
    this._supervisorEmail = newSupervisorEmail;
  }
  changePaymentMethod(paymentMethod: PaymentMethodEntity) {
    this._paymentMethod = paymentMethod;
  }

  /**
   * Checks if the challenge became overdue and returns true if the status changes
   */
  updateOverdueStatus(): boolean {
    if (this.deadline < new Date()) {
      this._status = ChallengeStatus.Overdue;
      return true;
    } else {
      return false;
    }
  }
  updateStatus(status: ChallengeStatus) {
    if (status == ChallengeStatus.Overdue) {
      return false;
    }
    this._status = status;
    return true;
  }

  updateSupervisorStatus(status: SupervisorEnum) {
    this._supervisorStatus = status;
  }
}
