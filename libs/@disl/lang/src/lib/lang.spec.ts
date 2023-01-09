import { CurrencyCode } from './concepts';
import { Money } from './index';

describe('@disl/lang', () => {
  it('should work', () => {
    expect(new Money(CurrencyCode.BRL, 2).valueOf()).toEqual(2.0);
  });
});
