import { Challenge } from './challenge-entity';
import { Player } from '../player';
import { Guid } from '@tokilabs/lang/';
import { EmailAddress } from '../..';
import { PaymentMethodEntity, PaymentMethodEnum } from '../payment-method';

// arrange, act and assert
describe('Challenge', () => {
  test('Create and call a new challenge', () => {
    const email = new EmailAddress('fulano@hotmai.com');
    const player = new Player('fulano', email);
    const date = new Date(2022, 11, 12);
    const creditCard = PaymentMethodEnum.creditCard;
    const payment = new PaymentMethodEntity(creditCard, 'pagar.me', 'hau20283');

    const a = new Challenge(
      'amar menos',
      'meuSupervisor',
      'emailSupervisor',
      player,
      new Guid(),
      30,
      date,
      payment
    );

    expect(a).toBeDefined();
    expect(() => a).not.toThrow();
    expect(a.id).toBeInstanceOf(Guid);
    expect(a.id).toBeDefined()
    expect(a.goal).toBe('amar menos');
    expect(a.deadline).toBe(date);
    expect(a.deadline).toBeInstanceOf(Date);
    expect(a.player).toBeInstanceOf(Player);
    expect(a.player).toBe(player);
    expect(a.supervisorEmail).toBe('emailSupervisor');
    expect(a.supervisorName).toBe('meuSupervisor');
    expect(a.price).toBe(30);
    expect(a.paymentMethod).toBeInstanceOf(PaymentMethodEntity);

  });

  test('throws a error on price < 24', () => {
    expect(
      () =>
        new Challenge(
          'amar menos',
          'meuSupervisor',
          'emailSupervisor',
          new Player('fulano', new EmailAddress('fulano@hotmai.com')),
          new Guid(),
          20,
          new Date(),
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
          'meuSupervisor',
          'emailSupervisor',
          player,
          new Guid(),
          40,
          deadline1
        )
    ).toThrow('Selecione uma data futura');
  });

  test('ChangePayment should build correctly', () => {
    //arrange
    const creditCard = PaymentMethodEnum.creditCard;
    const debitCard = PaymentMethodEnum.debitCard;
    const newPaymentMethod = new PaymentMethodEntity(
      debitCard,
      'pagseguro',
      'bi92'
    );
    const payment = new PaymentMethodEntity(creditCard, 'pagar.me', 'haa20283');

    //act
    const challenge = new Challenge(
      'amar menos',
      'meuSupervisor',
      'emailSupervisor',
      new Player('fulano', new EmailAddress('fulano@hotmai.com')),
      new Guid(),
      30,
      new Date(2022, 12, 12),
      payment
    );


    jest.spyOn(challenge, 'changePaymentMethod')
    challenge.changePaymentMethod(newPaymentMethod)

    //assert
    expect(challenge.changePaymentMethod).toBeDefined()
    expect(typeof challenge.changePaymentMethod).toBe('function');
    expect(challenge.changePaymentMethod).toBeCalledWith(newPaymentMethod)
  })
  test("ChangeSupervisor should build correctly", () => {
    //act
    const challenge2 = new Challenge(
      'amar menos',
      'meuSupervisor',
      'emailSupervisor',
      new Player('fulano', new EmailAddress('fulano@hotmai.com')),
      new Guid(),
      30,
      new Date(2022, 12, 12),
    );

    jest.spyOn(challenge2, 'changeSupervisor')
    const changeSup = challenge2.changeSupervisor('Rafael', 'rpp0818@hotmail.com')

    //assert
    expect(challenge2.changeSupervisor).toBeDefined();
    expect(typeof challenge2.changeSupervisor).toBe('function');
    expect(challenge2.changeSupervisor('Rafael', 'rpp0818@hotmail.com')).toEqual(changeSup);
    expect(challenge2.changeSupervisor).toBeCalledWith('Rafael', 'rpp0818@hotmail.com')
  });
});

