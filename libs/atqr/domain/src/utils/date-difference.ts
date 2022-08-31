import { Exception } from '@tokilabs/lang';
import { errAsync } from 'neverthrow';

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
export function dateDiff(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  try {
    dateDiff(this.a, this.b);
  } catch {
    Exception;
    if (Exception) {
      errAsync(new Exception('Function is not working'));
    }
  }
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
