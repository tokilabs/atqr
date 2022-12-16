export class EmailAddress {
  value: string;

  constructor(email: string) {
    const isValidEmail = EmailAddress.validate(email);

    if (isValidEmail) {
      this.value = email;
    } else {
      throw new Error('Invalid Email');
    }
  }

  /**
   * Thanks to:
   * http://fightingforalostcause.net/misc/2006/compare-email-regex.php
   * http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
   * http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
   * https://en.wikipedia.org/wiki/Email_address  The format of an email address is local-part@domain, where the
   * local part may be up to 64 octets long and the domain may have a maximum of 255 octets.[4]
   *
   * @param email
   * @returns
   */
  public static validate(email: string): boolean {
    const tester =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) return false;

    const emailParts = email.split('@');

    if (emailParts.length !== 2) return false;

    const account = emailParts[0];
    const address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    const domainParts = address.split('.');
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    if (!tester.test(email)) return false;

    return true;
  }
}