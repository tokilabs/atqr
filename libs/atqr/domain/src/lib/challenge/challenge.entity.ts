import { Guid } from '@tokilabs/lang/';
<<<<<<< HEAD:libs/atqr/domain/src/lib/challenge/challenge.entity.ts
import { PaymentMethodEntity } from '../payment-method/payment-method';
import { Player } from '../player/player.entity';
import { dateDiff } from '../../utils/date-difference';
=======
import { PaymentMethodEntity } from '../payment-method';
import { Player } from '../player';
import { dateDiff } from './date-difference';
>>>>>>> d0c07ee (testing and improve challenge class):libs/atqr/domain/src/lib/challenge-entity/challenge-entity.ts

export enum SupervisorEnum {
  'notInvited',
  'invited',
  'accepted',
<<<<<<< HEAD:libs/atqr/domain/src/lib/challenge/challenge.entity.ts
  'askedIfTheGoalIsAccomplished',
  'repliedIfTheGoalWasAccomplished',
=======
  'askedIfTheGoalIsComplish',
  'repliedIfTheGoalWasComplish',
>>>>>>> d0c07ee (testing and improve challenge class):libs/atqr/domain/src/lib/challenge-entity/challenge-entity.ts
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
<<<<<<< HEAD:libs/atqr/domain/src/lib/challenge/challenge.entity.ts
    private _supervisorStatus: SupervisorEnum = SupervisorEnum.notInvited
=======
    private _statusSupervisor: SupervisorEnum = SupervisorEnum.notInvited
>>>>>>> d0c07ee (testing and improve challenge class):libs/atqr/domain/src/lib/challenge-entity/challenge-entity.ts
  ) {
    this._id = new Guid();
    if (price >= 25) {
      this._price = price;
    } else {
      throw new Error('Selecione um valor acima de 25 reais');
    }
<<<<<<< HEAD:libs/atqr/domain/src/lib/challenge/challenge.entity.ts
    const today = new Date();
    if (dateDiff(today, deadline) > 1) {
      this._deadline = deadline;
    } else {
      throw Error('Selecione uma data futura');
    }
=======
>>>>>>> d0c07ee (testing and improve challenge class):libs/atqr/domain/src/lib/challenge-entity/challenge-entity.ts
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
    return this._price;
  }

<<<<<<< HEAD:libs/atqr/domain/src/lib/challenge/challenge.entity.ts
  get supervisorStatus() {
    return this._supervisorStatus;
=======
  get statusSupervisor() {
    return this._statusSupervisor;
>>>>>>> d0c07ee (testing and improve challenge class):libs/atqr/domain/src/lib/challenge-entity/challenge-entity.ts
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
