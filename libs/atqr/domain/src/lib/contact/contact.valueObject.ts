import { MaxLength, MinLength } from 'class-validator';
import { EmailAddress } from '../EmailService';
import { validate } from '../services/validateOrReject';
abstract class ValueObject<Contact> {
    type: Contact;
    value: string;
}
export enum ParticipationRole{
    Contender,
    Judge
}
export class Contact extends ValueObject<Contact>{
    @MinLength(5)
    @MaxLength(20)
    name: string;
    email: EmailAddress;
    role: ParticipationRole

    constructor(
        name: string,
        email: EmailAddress,
        role: ParticipationRole
    ){
        super()
        this.name = name
        this.email = email
        this.role = role
        
        return new Contact(
            (name = this.name),
            (email = this.email),
            (role = this.role)
          );
    }
    

}
validate(Contact)//uses validateOrReject from class-validator
