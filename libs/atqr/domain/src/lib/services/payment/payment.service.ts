import { PaymentMethodEntity } from '../../PaymentMethod';
import { IPaymentService } from './interfaces';

export class PaymentService {
  constructor(private payment: IPaymentService) {}

  createCostumer(costumerId: string) {
    return this.payment.createCostumer(costumerId);
  }
  createPaymentMethod(costumerId: string, paymentMethod: PaymentMethodEntity) {
    return this.payment.createPaymentMethod(costumerId, paymentMethod);
  }
  setupFuturePayment(
    costumerId: string,
    amount: number,
    date: Date
  ) {
    return this.payment.setupFuturePayment(costumerId, amount, date);
  }
  capturePayment(costumerId: string) {
    return this.payment.capturePayment(costumerId);
  }
}
