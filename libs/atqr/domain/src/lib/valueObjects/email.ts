import { IsEmail } from 'class-validator';
import { ValueObject } from '../../utils/valueObject';

export class EmailAddress {
  @IsEmail()
  emailAddress: string;
}

export class Email extends ValueObject<Email>{
  constructor(
    public readonly to: EmailAddress,
    public readonly subject: string,
    public readonly body: string
  ) {
    super(Email, ['to', 'subject', 'body']);
  }
  
  public setTo(newTo: EmailAddress): Email{
    return this.newInstanceWith({
      to: newTo
    })
  }
  public setSubject(newSubject: string): Email{
    return this.newInstanceWith({
      subject: newSubject
    })
  }
  public setBody(newBody: string): Email{
    return this.newInstanceWith({
      body: newBody
    })
  }
}