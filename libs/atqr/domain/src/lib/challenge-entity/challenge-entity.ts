import { Guid } from '@tokilabs/lang/';
import { PaymentMethodEntity } from '../payment-method';
import { Player } from '../player';
import { dateDiff } from './date-difference';

export enum SupervisorEnum {
  'notInvited',
  'invited',
  'accepted',
  'askedIfTheGoalIsAccomplished',
  'repliedIfTheGoalWasAccomplished',
}

export enum StatusEnum {
  Ongoing,
  Completed,
  Failed,
}

export class Challenge {
  private _id: Guid;
  private _price: number;
  private _deadline: Date;
  constructor(
    private _goal: string,
    private _supervisorName: string,
    private _supervisorEmail: string,
    private _player: Player,
    _id: Guid,
    price: number,
    deadline: Date,
    private _paymentMethod?: PaymentMethodEntity,
    private _status?: StatusEnum,
    private _supervisorStatus: SupervisorEnum = SupervisorEnum.notInvited
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
  }
  changePaymentMethod(paymentMethod: PaymentMethodEntity) {
    this._paymentMethod = paymentMethod;
  }
}
