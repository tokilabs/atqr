import { PaymentMethodEntity } from '../../PaymentMethod';
import { IPaymentService } from './interfaces';

export class PaymentService {
  constructor(private payment: IPaymentService) {}

  createCustomer(customerId: string) {
    return this.payment.createCustomer(customerId);
  }
  createPaymentMethod(customerId: string, paymentMethod: PaymentMethodEntity) {
    return this.payment.createPaymentMethod(customerId, paymentMethod);
  }
  setupFuturePayment(customerId: string, amount: number, date: Date) {
    return this.payment.setupFuturePayment(customerId, amount, date);
  }
  capturePayment(customerId: string) {
    return this.payment.capturePayment(customerId);
  }
}
