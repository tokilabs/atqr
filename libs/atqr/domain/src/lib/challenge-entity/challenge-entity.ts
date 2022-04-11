import { Guid } from '@tokilabs/lang/';
import { PaymentMethodEntity } from '../payment-method';
import { Player } from '../player';
import { dateDiff } from './date-difference';

export enum SupervisorEnum {
  'notInvited',
  'invited',
  'accepted',
  'askedIfTheGoalIsComplish',
  'repliedIfTheGoalWasComplish',
}

export enum StatusEnum {
  Ongoing,
  Completed,
  Failed,
}

export class Challenge {
  private _id: Guid;
  private _price: number;
  constructor(
    private _goal: string, //numero maximo-min de caracteres?
    private _deadline: Date, //
    private _supervisorName: string,
    private _supervisorEmail: string,
    private _player: Player,
    id: Guid,
    price: number,
    private _paymentMethod?: PaymentMethodEntity,
    private _status?: StatusEnum,
    private _statusSupervisor: SupervisorEnum = SupervisorEnum.notInvited
  ) {
    this._id = new Guid();
    if (price >= 25) {
      this._price = price;
    } else {
      throw new Error('Selecione um valor acima de 25 reais');
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
    const today = new Date();
    const deadline = this._deadline;
    if (dateDiff(today, deadline) > 1) {
      return this._deadline;
    } else {
      new Error('Selecione uma data futura');
    }
  }
  get price() {
    if (this._price > 24) {
      return this._price;
    } else {
      new Error('Selecione um valor acima de 25 reais');
    }
    return this._price;
  }

  get statusSupervisor() {
    return this._statusSupervisor;
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
