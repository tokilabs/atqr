import { Guid } from '@tokilabs/lang/';
import { PaymentMethod, Player} from '';

export enum PriceEnum {
  firstValue = 25,
  secondValue = 50,
  thirdValue = 75,
  fourthValue = 100,
  fifthValue = 250,
  sixthValue = 1000,
}
export class Challenge {

  get id(){
    return this._id;
  }

  get goal(){
    return this._goal;
  }

  get deadline(){
    return this._deadline
  }

  get price(){
    return this._price
  }

  get supervisorName(){
    return this._supervisorName
  }

  get supervisorEmail() {
    return this._supervisorEmail
  }

  get player(){
    return this._player
  }

  get paymentMethod(){
    return this._paymentMethod
  }

  constructor(
      private _id: Guid,
      private _goal: string,
      private _deadline: Date,
      private _price: PriceEnum,
      private _supervisorName: string,
      private _supervisorEmail: string,
      private _player: Player,
      private _paymentMethod: PaymentMethod) {
  }
  // não vai ter mais? e se tiver podemos trocar só o email ou só o nome?
  // changeSupervisor(newSupervisorName:string, newSupervisorEmail:string){
  //   this._supervisorName = newSupervisorName;
  //   this._supervisorEmail = newSupervisorEmail;
  // }

  changePaymentMethod(){
    this._paymentMethod = new PaymentMethod();
  }
}
