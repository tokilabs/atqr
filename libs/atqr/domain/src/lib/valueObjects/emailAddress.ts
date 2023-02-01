import { ValueObject } from '../../';

export class EmailAddress extends ValueObject<EmailAddress> {
  constructor(public readonly value: string) {
    super(EmailAddress, ['value'])
  }

  setEmailAddress(value: string) {
    return this.newInstanceWith( { value } )
}
}
