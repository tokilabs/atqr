import { Guid } from "guid-typescript";
import { PaymentMethod, Player} from './';

export enum PriceEnum {
  firstValue = 25,
  secondValue = 50,
  thirdValue = 75,
  fourthValue = 100,
  fifthValue = 250,
  sixthValue = 1000,
}
export class Challenge {
  #id: Guid;
  #goal: string;
  #deadline: Date;
  #price: PriceEnum;
  #supervisorName: string;
  #supervisorEmail: string;
  #player: Player;
  #paymentMethod: PaymentMethod;
  #newPaymentMethod: PaymentMethod;

  get id(){
    return this.#id;
  }

  get goal(){
    return this.#goal;
  }

  get deadline(){
    return this.#deadline
  }

  get price(){
    return this.#price
  }

  get supervisorName(){
    return this.#supervisorName
  }

  get supervisorEmail() {
    return this.#supervisorEmail
  }

  get player(){
    return this.#player
  }

  get paymentMethod(){
    return this.#paymentMethod
  }

  get newPaymentMethod(){
    return this.#newPaymentMethod;
  }

  constructor(
      id: Guid,
      goal: string,
      deadline: Date,
      price: PriceEnum,
      supervisorName: string,
      supervisorEmail: string,
      player: Player,
      paymentMethod: PaymentMethod) {
        this.#id = id;
        this.#goal = goal;
        this.#deadline = deadline;
        this.#price = price;
        this.#supervisorName = supervisorName;
        this.#supervisorEmail = supervisorEmail;
        this.#player = player;
        this.#paymentMethod = paymentMethod;


  }

  changeSupervisor(newSupervisorName:string, newSupervisorEmail:string){
    this.#supervisorName = newSupervisorName;
    this.#supervisorEmail = newSupervisorEmail;
  }

  changePaymentMethod(paymentMethod: PaymentMethod, newPaymentMethod: PaymentMethod){
    newPaymentMethod = new paymentMethod;
    paymentMethod = newPaymentMethod;

  }
}
