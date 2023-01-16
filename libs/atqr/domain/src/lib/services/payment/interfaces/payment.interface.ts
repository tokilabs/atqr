import { PaymentMethodEntity } from '../../../PaymentMethod';

export interface IPaymentService {
  createCostumer(costumerId: string): void;
  createPaymentMethod(
    costumerId: string,
    paymentMethod: PaymentMethodEntity
  ): void;
  setupFuturePayment(
    costumerId: string,
    amount: number,
    date: Date,
  ): void;
  capturePayment(costumerId: string): void;
}
