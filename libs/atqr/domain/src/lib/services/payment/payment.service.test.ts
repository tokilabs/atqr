import { PaymentService } from './payment.service';
describe('Testing the PaymentService class', () => {
  it('should create a new instance of PaymentService', () => {

    const mockPayment = {
      createCostumer: jest.fn(),
      createPaymentMethod: jest.fn(),
      setupFuturePayment: jest.fn(),
      capturePayment: jest.fn(),
    };

    const paymentService = new PaymentService(mockPayment);

    expect(paymentService).toBeTruthy();
  });

});
