import { PaymentMethodEntity } from '../../../PaymentMethod';

export interface IPaymentService {
  createCustomer(customerId: string): string;
  createPaymentMethod(
    costumerId: string,
    paymentMethod: PaymentMethodEntity
  ): void;
  setupFuturePayment(costumerId: string, amount: number, date: Date): string;

  capturePayment(costumerId: string): boolean;
}
