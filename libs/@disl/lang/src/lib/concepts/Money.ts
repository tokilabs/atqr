import { Decimal } from '@tokilabs/lang';
import { CurrencyCode } from './Currency';

export class Money extends Decimal {
  constructor(public readonly currency: CurrencyCode, value: number | string) {
    super(value);
  }
}
