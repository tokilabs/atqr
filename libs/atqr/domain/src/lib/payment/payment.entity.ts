import { Guid } from '@tokilabs/lang';

export enum PaymentMethodEnum {
  'creditCard' = 'creditCard',
  'debitCard' = 'debitCard',
}
export class PaymentEntity {
  id: Guid;
  //review customerId property type
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
    this.customerId = new Guid()
    this.method = method;
    this.paymentService = paymentService;
    this.token = token;
  }


  getToken() {
    return this.token;
  }
}
