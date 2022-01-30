import { NodeMailgun } from 'ts-mailgun';

const mailer = new NodeMailgun();
mailer.apiKey = 'pubkey-0c464eb59a5d70b50dc5a23f25cd0637'; // Set your API key
mailer.domain = 'sandbox825e4611e5e84e93b848c175df8b6b60.mailgun.org'; // Set the domain you registered earlier
mailer.fromEmail = 'noreply@my-sample-app.com'; // Set your from email
mailer.fromTitle = 'My Sample App'; // Set the name you would like to send from

mailer.options = {
  host: 'api.eu.mailgun.net',
};

mailer.init();

// Send an email to test@example.com
mailer
  .send('test@example.com', 'Hello!', '<h1>hsdf</h1>')
  .then((result) => console.log('Done', result))
  .catch((error) => console.error('Error: ', error));

