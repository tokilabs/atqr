import { ValueObject } from "../../utils/valueObject";

export class EmailAddress extends ValueObject<EmailAddress> {
  public value: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(value: string) {
    super(EmailAddress, ['value'])
  }

  setEmailAddress(value: string) {
    return this.newInstanceWith( { value } )
}
}
