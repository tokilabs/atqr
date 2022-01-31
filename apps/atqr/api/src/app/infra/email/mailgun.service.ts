import { EmailTransporter } from '@atqr/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailgunService implements EmailTransporter {
  email: string;
  player: string;
  configs: object;
  sendMail(): void {
    throw new Error('Method not implemented.');
  }
}

import { NodeMailgun } from 'ts-mailgun';

export class Mailer extends NodeMailgun {
  constructor(
    apiKey: 'pubkey-0c464eb59a5d70b50dc5a23f25cd0637', // Set your API key
    domain: 'sandbox825e4611e5e84e93b848c175df8b6b60.mailgun.org', // Set the domain you registered earlier
    fromEmail: 'noreply@my-sample-app.com', // Set your from email
    fromTitle: 'My Sample App' // Set the name you would like to send from
  ) {
    super();
  }
}
let mailer = new Mailer(
  'pubkey-0c464eb59a5d70b50dc5a23f25cd0637',
  'sandbox825e4611e5e84e93b848c175df8b6b60.mailgun.org',
  'noreply@my-sample-app.com',
  'My Sample App'
);

mailer.options = {
  host: 'api.eu.mailgun.net',
};

mailer.init();

mailer
  .send('test@example.com', 'Hello!', '<h1>hsdf</h1>')
  .then((result) => console.log('Done', result))
  .catch((error) => console.error('Error: ', error));
