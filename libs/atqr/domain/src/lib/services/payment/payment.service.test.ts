import { PaymentService } from './payment.service';
describe('Testing the PaymentService class', () => {
  const mockPayment = {
    createCustomer: jest.fn(),
    createPaymentMethod: jest.fn(),
    setupFuturePayment: jest.fn(),
    capturePayment: jest.fn(),
  };
  it('should create a new instance of PaymentService', () => {

    const paymentService = new PaymentService(mockPayment);
    expect(paymentService).toBeTruthy();
  });

});
