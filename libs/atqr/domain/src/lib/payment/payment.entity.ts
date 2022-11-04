import { Guid } from '@tokilabs/lang';

// This should be deleted as it serves no purpose
export enum PaymentMethodEnum {
  'creditCard' = 'creditCard',
  'debitCard' = 'debitCard',
}

export class PaymentEntity {
  id: Guid;
  //Todo: review customerId property type
  customerId: Guid;
  method: PaymentMethodEnum;
  paymentService: `pagar.me` | `pagseguro`;
  token: string;

  constructor(
    method: PaymentMethodEnum,
    paymentService: `pagar.me` | `pagseguro`,
    token: string
  ) {
    this.id = new Guid();
    this.customerId = new Guid();
    this.method = method;
    this.paymentService = paymentService;
    this.token = token;
  }

  getId() {
    return this.id;
  }

  getCustomerId() {
    return this.customerId;
  }

  getToken() {
    return this.token;
  }
}
