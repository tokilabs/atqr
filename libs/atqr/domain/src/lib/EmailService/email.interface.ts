import { IsEmail } from 'class-validator';
import { ValueObject } from '../../utils/valueObject';

export class EmailAddress {
  @IsEmail()
  emailAddress: string;
}
export interface IEmail {
  to: EmailAddress;
  subject: string;
  body: string;
}
export class Email extends ValueObject<Email> implements IEmail {
  constructor(
    public readonly to: EmailAddress,
    public subject: string,
    public body: string
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
  
    
  

