import { Exception, Guid } from '@tokilabs/lang/';
import { Transform } from 'class-transformer';
import { dateDiff } from '../../utils/date-difference';
import { PaymentMethodEntity } from '../PaymentMethod';
import { Player } from '../player/player.entity';

export enum SupervisorEnum {
  'notInvited',
  'invited',
  'accepted',
  'askedIfTheGoalIsAccomplished',
  'repliedIfTheGoalWasAccomplished',
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
    private _goal: string,
    private _supervisorName: string,
    private _supervisorEmail: string,
    private _player: Player,
    price: number,
    deadline: Date,
    private _paymentMethod?: PaymentMethodEntity,
    _status: ChallengeStatus = ChallengeStatus.Ongoing,
    private _supervisorStatus: SupervisorEnum = SupervisorEnum.notInvited
  ) {
    this._id = new Guid();
    if (price >= 25) {
      this._price = price;
    } else {
      throw new Error('Selecione um valor acima de 25 reais'); // treat this error
    }
    const today = new Date();
    if (dateDiff(today, deadline) > 1) {
      this._deadline = deadline;
    } else {
      throw Error('Selecione uma data futura'); // treat this error
    }

    this._status = _status;
  }
  get id() {
    return this._id;
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
  changeSupervisor(newSupervisorName: string, newSupervisorEmail: string) {
    this._supervisorName = newSupervisorName;
    this._supervisorEmail = newSupervisorEmail;
    if (
      this._supervisorName != newSupervisorName ||
      this._supervisorEmail != newSupervisorEmail
    ) {
      throw new Exception(
        'Error changing supervisor. Supervisor did not get newSupervisorName or newSupervisorEmail'
      );
    } else {
      return { newSupervisorName, newSupervisorEmail };
    }

    // implement error
  }

  changePaymentMethod(paymentMethod: PaymentMethodEntity) {
    this._paymentMethod = paymentMethod;

    // implement error
  }

  /**
   * Checks if the challenge became overdue and returns true if the status changes
   */
  updateOverdueStatus(): boolean {
    if (this.deadline < new Date()) {
      // implement error
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
    //implement error
    this._status = status;
    return true;
  }
}
