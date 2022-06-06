export class EmailAddress {
  email: any;

  constructor(email: any) {
    const isValidEmail = EmailValidator.validate(email);

    if (isValidEmail) {
      this.email = email;
    } else {
      throw new Error('Invalid Email');
    }
  }
}
