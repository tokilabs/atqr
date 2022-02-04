import { EmailTransporter } from '@atqr/domain';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeMailgun } from 'ts-mailgun';

@Injectable()
export class MailgunService
  implements EmailTransporter, OnApplicationBootstrap
{
  apiKey = 'apiKeyToken'; // Set your API key
  domain = ''; // Set the domain you registered earlier
  fromEmail = 'noreply@my-sample-app.com'; // Set your from email
  fromTitle = 'My Sample App'; // Set the name you would like to send from
  mailer: NodeMailgun;
  constructor(private readonly configService: ConfigService) {}
  onApplicationBootstrap() {
    this.apiKey = this.configService.get<string>('MAILGUN_API_KEY');
    this.domain = this.configService.get<string>('MAILGUN_DOMAIN');

    this.mailer = new NodeMailgun(this.apiKey, this.domain);
  }
  configs: object;
  sendMail(): void {
    this.mailer.send()
    throw new Error('Method not implemented.');
  }
}

export class Mailer extends NodeMailgun implements OnApplicationBootstrap {
  apiKey = 'apiKeyToken'; // Set your API key
  domain = ''; // Set the domain you registered earlier
  fromEmail = 'noreply@my-sample-app.com'; // Set your from email
  fromTitle = 'My Sample App'; // Set the name you would like to send from

  constructor(private readonly configService: ConfigService) {
    super();
  }
  onApplicationBootstrap() {
    this.apiKey = this.configService.get<string>('MAILGUN_API_KEY');
  }
}

let mailer = new Mailer(
  'MAILGUN_API_KEY',
  '',
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
