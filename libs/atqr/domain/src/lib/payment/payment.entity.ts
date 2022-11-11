import { Guid } from '@tokilabs/lang';
import { Challenge } from '../challenge/challenge.entity';

// This should be deleted as it serves no purpose
// export enum PaymentMethodEnum {
//   card = 'card',
// } Rai commented this and changed its syntax

export class PaymentEntity {
  id: Guid;
  //Todo: review customerId property type
  customerId: Guid;
  // method: PaymentMethodEnum;
  chargeCard: Challenge;
  verifyFunds: Challenge;
  token: string;

  constructor(
    // method: PaymentMethodEnum,
    chargeCard: Challenge,
    verifyFunds: Challenge,
    token: string
  ) {
    this.id = new Guid();
    this.customerId = new Guid();
    // this.method = method;
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
