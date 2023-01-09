import { RegEx } from 'regex';

export interface IEmail {
  to: EmailAddress;
  subject: string;
  message?: string;
}

function validateEmailAddress(emailAddress: string): EmailAddress {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const emails = emailAddress[''];
  const testEmails = emails.forEach((emailAddress) => {
    regex.test(emailAddress);
    console.log(regex.test(emailAddress));
  });
  console.log(testEmails);
  return testEmails;
}

validateEmailAddress('gabi@toki.life');
export interface EmailAddress {
  emailAddress: string;
  validateEmailAddress(): typeof validateEmailAddress;
}

export class Email implements IEmail {
  constructor(
    public to: EmailAddress,
    public subject: string,
    public body: string,
  ) {
    this.to = to;
    this.subject = subject;
    this.body = body;
  }

  public get email() {
    return this.to;
  }

  public get from() {
    return process.env.FROM_EMAIL;
  }

  public get Subject() {
    return this.subject;
  }

  public get Message() {
    return this.message;
  }
}
