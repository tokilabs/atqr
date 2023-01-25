import { ValueObject } from '../../utils/valueObject';

class PreAuthorization extends ValueObject<PreAuthorization> {
  public readonly createdAt: Date = new Date();
  public readonly expiresAt: Date = new Date();

  constructor(public readonly authId: string, public readonly amount: number) {
    super(PreAuthorization, ['authId', 'amount']);

    this.expiresAt.setMonth(this.expiresAt.getMonth() + 1);
  }
  setCreatedAt(date: Date): PreAuthorization {
    return this.newInstanceWith({
      createdAt: date,
    });
  }
  setExpiresAt(date: Date): PreAuthorization {
    return this.newInstanceWith({
      expiresAt: date,
    });
  }
  setAuthId(authId: string): PreAuthorization {
    return this.newInstanceWith({
      authId,
    });
  }
  setAmount(amount: number): PreAuthorization {
    return this.newInstanceWith({
      amount,
    });
  }
}
