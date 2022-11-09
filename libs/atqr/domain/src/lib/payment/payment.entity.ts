import { Guid } from '@tokilabs/lang';
import { Challenge } from '../challenge/challenge.entity';

// This should be deleted as it serves no purpose
export enum PaymentMethodEnum {
  'creditCard' = 'creditCard',
  'debitCard' = 'debitCard',
}

//export enum PaymentOptions: PaymentEntity -- n deveria estar dentro da classe? {
//   'credit' = 'card',
//   'debit' = 'pix',
// } se tem só type card entao n vai ter pix

export class PaymentEntity {
  id: Guid;
  //Todo: review customerId property type
  customerId: Guid;
  method: PaymentMethodEnum;
  paymentService: `pagar.me` | `pagseguro`;
  chargeCard: Challenge;
  verifyFunds: Challenge;
  token: string;

  constructor(
    method: PaymentMethodEnum,
    paymentService: `pagar.me` | `pagseguro`,
    chargeCard: Challenge,
    verifyFunds: Challenge,
    token: string
  ) {
    this.id = new Guid();
    this.customerId = new Guid();
    this.method = method;
    this.paymentService = paymentService;
    this.chargeCard = chargeCard;
    this.verifyFunds = verifyFunds;
    this.token = token;
  }

  getId() {
    return this.id;
  }

  getCustomerId() {
    return this.customerId;
  }

getChargeCard() {
    return this.chargeCard;
  }

  getVerifyFunds() {
    return this.verifyFunds;
  }



  getToken() {
    return this.token;
  }
}
