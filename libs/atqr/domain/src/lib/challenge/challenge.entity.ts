import { Guid } from '@tokilabs/lang/';
import { dateDiff } from '../../utils/dateDifference';
import { EmailAddress } from '../EmailService';
import { PaymentMethodEntity } from '../PaymentMethod';
import { Player } from '../player/player.entity';
import { ChallengeStatus, ParticipationStatus } from '../types/enums';

export class Challenge {
  private _contenders: Enrollment[];
  private _judges: Officiation[];
  @Transform(({ value }) => ChallengeStatus[value])
  private _status?: ChallengeStatus;
  private _createdAt: Date;

  constructor(
    private _goal: string,
    private _supervisorName: string,
    private _supervisorEmail: EmailAddress,
    private _player: Player,
    price: number,
    deadline: Date,
    private _paymentMethod?: PaymentMethodEntity,
    _status: ChallengeStatus = ChallengeStatus.Ongoing,
    private _supervisorStatus: ParticipationStatus = ParticipationStatus.NotRequested
  ) {
    this._id = new Guid();
    if (price >= 25) {
      this._price = price;
    } else {
      throw new Error('Selecione um valor acima de 25 reais');
    }
    const today = new Date();
    if (dateDiff(today, deadline) > 1) {
      this._deadline = deadline;
    } else {
      throw Error('Selecione uma data futura');
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

  updateSupervisorStatus(status: ParticipationStatus) {
    this._supervisorStatus = status;
  }
}
