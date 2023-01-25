import { ValueObject } from '../../utils/valueObject';

class PreAuthorization extends ValueObject<PreAuthorization> {
  constructor(
    public readonly authId: string,
    public readonly amountCents: number,
    public readonly approved: boolean,
    public readonly createdAt: Date,
    public readonly expiresAt: Date,
    public readonly currency: string
  ) {
    super(PreAuthorization, [
      'authId',
      'amountCents',
      'approved',
      'createdAt',
      'expiresAt',
      'currency',
    ]);
  }
  setAuthId(authId: string): PreAuthorization {
    return this.newInstanceWith({
      authId,
    });
  }
  setAmountCents(amountCents: number): PreAuthorization {
    return this.newInstanceWith({
      amountCents,
    });
  }
  setApproved(approved: boolean): PreAuthorization {
    return this.newInstanceWith({
      approved,
    });
  }
  setCreatedAt(createdAt: Date): PreAuthorization {
    return this.newInstanceWith({
      createdAt,
    });
  }
  setExpiresAt(expiresAt: Date): PreAuthorization {
    return this.newInstanceWith({
      expiresAt,
    });
  }
  setCurrency(currency: string): PreAuthorization {
    return this.newInstanceWith({
      currency,
    });
  }
}
// id, amountCents, createdAt, expiresAt, currency,
