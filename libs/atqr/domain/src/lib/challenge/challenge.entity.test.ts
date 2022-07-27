import { Challenge } from './challenge.entity';
import { Player } from '../player';
import { Guid } from '@tokilabs/lang/';
import { EmailAddress, PaymentMethodEntity, PaymentMethodEnum } from '../..';

// arrange, act and assert
describe('Challenge', () => {
  test('Should correctly be instantiated when given the correct data', () => {
    const email = new EmailAddress('fulano@hotmai.com');
    const player = new Player('fulano', email);
    const date = new Date(2022, 11, 12);
    const creditCard = PaymentMethodEnum.creditCard;
    const payment = new PaymentMethodEntity(creditCard, 'pagar.me', 'hau20283');

    const challenge = new Challenge(
      'goal',
      'meuSupervisor',
      'emailSupervisor',
      player,
      new Guid(),
      30,
      date,
      payment
    );

    expect(challenge).toBeDefined();
    expect(() => challenge).not.toThrow();
    expect(challenge.id).toBeInstanceOf(Guid);
    expect(challenge.id).toBeDefined();
    expect(challenge.goal).toBe('goal');
    expect(challenge.deadline).toBe(date);
    expect(challenge.deadline).toBeInstanceOf(Date);
    expect(challenge.player).toBeInstanceOf(Player);
    expect(challenge.player).toBe(player);
    expect(challenge.supervisorEmail).toBe('emailSupervisor');
    expect(challenge.supervisorName).toBe('meuSupervisor');
    expect(challenge.price).toBe(30);
    expect(challenge.paymentMethod).toBeInstanceOf(PaymentMethodEntity);
  });

  test('Should throw a error if price is less than 24', () => {
    expect(
      () =>
        new Challenge(
          'goal',
          'meuSupervisor',
          'emailSupervisor',
          new Player('fulano', new EmailAddress('fulano@hotmai.com')),
          new Guid(),
          20,
          new Date()
        )
    ).toThrow('Selecione um valor acima de 25 reais');
  });

  test('Should throw a error if the deadline entry is a past date', () => {
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

  test('Should correctly change the payment method when given the data needed', () => {
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

    jest.spyOn(challenge, 'changePaymentMethod');
    challenge.changePaymentMethod(newPaymentMethod);

    //assert
    expect(challenge.changePaymentMethod).toBeDefined();
    expect(typeof challenge.changePaymentMethod).toBe('function');
    expect(challenge.changePaymentMethod).toBeCalledWith(newPaymentMethod);
  });
  test('should correctly change the supervisor when give the data needed', () => {
    //act
    const challenge2 = new Challenge(
      'amar menos',
      'meuSupervisor',
      'emailSupervisor',
      new Player('fulano', new EmailAddress('fulano@hotmai.com')),
      new Guid(),
      30,
      new Date(2022, 12, 12)
    );

    jest.spyOn(challenge2, 'changeSupervisor');
    const changeSup = challenge2.changeSupervisor(
      'Rafael',
      'rpp0818@hotmail.com'
    );

    //assert
    expect(challenge2.changeSupervisor).toBeDefined();
    expect(typeof challenge2.changeSupervisor).toBe('function');
    expect(
      challenge2.changeSupervisor('Rafael', 'rpp0818@hotmail.com')
    ).toEqual(changeSup);
    expect(challenge2.changeSupervisor).toBeCalledWith(
      'Rafael',
      'rpp0818@hotmail.com'
    );
  });
});
