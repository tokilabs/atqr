import { Challenge } from './challenge-entity';
import { Player } from '../player';
import { Guid } from '@tokilabs/lang/';
import { EmailAddress } from '../..';
import { PaymentMethodEntity, PaymentMethodEnum } from '../payment-method';

//arrange, act and assert => organizar, fazer a ação do teste e criar expectativas sobre o resultado daquilo
describe('Challenge', () => {
  test('Create and call a new challenge', () => {
    const email = new EmailAddress('fulano@hotmai.com');
    const player = new Player('fulano', email);
    const date = new Date(2022, 11, 12);
    const creditCard = PaymentMethodEnum.creditCard;
    const debitCard = PaymentMethodEnum.debitCard;
    const payment = new PaymentMethodEntity(creditCard, 'pagar.me', 'hau20283');
    const paymentChange = new PaymentMethodEntity(
      debitCard,
      'pagseguro',
      'bli38393'
    );

    const a = new Challenge(
      'amar menos',
      date,
      'meuSupervisor',
      'emailSupervisor',
      player,
      new Guid(),
      30,
      payment
    );

    expect(a).toBeDefined();
    expect(() => a).not.toThrow();
    expect(a.id).toBeInstanceOf(Guid);
    expect(a.goal).toBe('amar menos');
    expect(a.deadline).toBe(date);
    expect(a.player).toBeInstanceOf(Player);
    expect(a.player).toBe(player);
    expect(a.supervisorEmail).toBe('emailSupervisor');
    expect(a.supervisorName).toBe('meuSupervisor');
    expect(a.price).toBe(30);
    expect(a.deadline).toBeInstanceOf(Date);
    expect(a.deadline).toBe(date);
    expect(a.paymentMethod).toBeInstanceOf(PaymentMethodEntity);
  });
  test('throws a error on price < 24', () => {
    expect(
      () =>
        new Challenge(
          'amar menos',
          new Date(),
          'meuSupervisor',
          'emailSupervisor',
          new Player('fulano', new EmailAddress('fulano@hotmai.com')),
          new Guid(),
          20
        )
    ).toThrow('Selecione um valor acima de 25 reais');
  });

  test('throws a error if the entry deadline is already passed', () => {
    const email = new EmailAddress('fulano@hotmai.com');
    const player = new Player('fulano', email);
    const deadline1 = new Date(2000, 11, 12);

    expect(
      () =>
        new Challenge(
          'amar menos',
          deadline1,
          'meuSupervisor',
          'emailSupervisor',
          player,
          new Guid(),
          40
        )
    ).toThrow('Selecione uma data futura');
  });

  test('methods  are called', () => {
    const creditCard = PaymentMethodEnum.creditCard;
    const debitCard = PaymentMethodEnum.debitCard;
    const changePayment = new PaymentMethodEntity(
      debitCard,
      'pagseguro',
      'bli912'
    );
    const payment = new PaymentMethodEntity(creditCard, 'pagar.me', 'haa20283');

    const challenge = new Challenge(
      'amar menos',
      new Date(),
      'meuSupervisor',
      'emailSupervisor',
      new Player('fulano', new EmailAddress('fulano@hotmai.com')),
      new Guid(),
      30,
      payment
    );

    expect(typeof challenge.changePaymentMethod).toBe('function');

    const spychangeSupervisor = jest.spyOn(challenge, 'changePaymentMethod');
    const trueChange: PaymentMethodEntity = jest.fn(() => true);
    const result = challenge.changePaymentMethod(trueChange);
  });
});
