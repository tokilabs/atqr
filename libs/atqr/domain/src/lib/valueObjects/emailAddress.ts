import { ValueObject } from "../../utils/valueObject";

export class EmailAddress extends ValueObject<EmailAddress> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(public readonly value: string) {
    super(EmailAddress, ['value'])
  }

  setEmailAddress(value: string) {
    return this.newInstanceWith( { value } )
}
}
