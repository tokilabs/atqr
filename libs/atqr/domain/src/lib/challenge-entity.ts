import { Guid } from '@tokilabs/lang/';
import { PaymentMethodEntity } from './payment-method/payment-method';
import { Player } from './player';
// export enum PriceEnum {
//   firstValue = 25,
//   secondValue = 50,
//   thirdValue = 75,
//   fourthValue = 100,
//   fifthValue = 250,
//   sixthValue = 1000,
// }
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
    private _status: string = 'Verifying',
    private _notifiedSupervisor: boolean = false //testar - ver se uso email-service da gabi//
  ) {
    this._id = new Guid();
    this._id = id;
    if (price >= 25) {
     this._price = price } else {
        throw new Error('Selecione um valor acima de 25 reais')
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
    return this._price
  }
  get notifiedSupervisor() {
    return this._notifiedSupervisor;
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
