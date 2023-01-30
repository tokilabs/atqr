import { ValueObject } from '../../utils/valueObject';
import { Challenge } from '../challenge';
import { PaymentStatus, PaymentFundsStatus } from '../PaymentMethod/enums';
import { ContenderOutcome } from '../types';
import { PaymentMethod, User } from '../types/stubs';

export class Enrollment extends ValueObject<Enrollment> {
  constructor(
    public readonly contender: User,
    public readonly judge: User,
    public readonly challenge: Challenge,
    public readonly contenderAlias: string | null,
    public readonly pledge: number,
    public readonly outcome: ContenderOutcome,
    public readonly paymentStatus: PaymentStatus,
    public readonly paymentMethod: PaymentMethod,
    public readonly paymentFundsStatus: PaymentFundsStatus
  ) {
    super(Enrollment, [
      'contender',
      'judge',
      'challenge',
      'contenderAlias',
      'pledge',
      'outcome',
      'paymentStatus',
      'paymentMethod',
      'paymentFundsStatus',
    ]);

    if (contender == judge) {
      throw Error('A contender cannot be a judge of their own challenge');
    }
  }

  public setContender(value: User) {
    return this.newInstanceWith({
      contender: value,
    });
  }

  public setJudge(value: User) {
    return this.newInstanceWith({
      judge: value,
    });
  }

  public setChallenge(value: Challenge) {
    return this.newInstanceWith({
      challenge: value,
    });
  }

  public setContenderAlias(value: string | null) {
    return this.newInstanceWith({
      contenderAlias: value,
    });
  }

  public setPledge(value: number) {
    return this.newInstanceWith({
      pledge: value,
    });
  }

  public setOutcome(value: ContenderOutcome) {
    return this.newInstanceWith({
      outcome: value,
    });
  }

  public setPaymentStatus(value: PaymentStatus) {
    return this.newInstanceWith({
      paymentStatus: value,
    });
  }

  public setPaymentMethod(value: PaymentMethod) {
    return this.newInstanceWith({
      paymentMethod: value,
    });
  }

  public setPaymentFundsStatus(value: PaymentFundsStatus) {
    return this.newInstanceWith({
      paymentFundsStatus: value,
    });
  }
}
