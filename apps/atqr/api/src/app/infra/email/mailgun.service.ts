import { Email, EmailTransporter } from '@atqr/domain';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeMailgun } from 'ts-mailgun';

@Injectable()
export class MailgunService
  implements EmailTransporter, OnApplicationBootstrap
{
  private mailer: NodeMailgun;

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    this.mailer = new NodeMailgun(
      this.configService.get<string>('MAILGUN_API_KEY'),
      this.configService.get<string>('MAILGUN_DOMAIN')
    );

    this.mailer.fromEmail = this.configService.get<string>('MAILGUN_DOMAIN');
    this.mailer.fromTitle = this.configService.get<string>('MAILGUN_DOMAIN');
    this.mailer.options = {
      host: 'api.eu.mailgun.net',
    };

    this.mailer.init();
  }

  async sendMail(email: Email): Promise<void> {
    try {
      const result = await this.mailer.send(
        email.to.email.toString(),
        email.subject,
        email.body
      );

      console.log('Done', result);
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}
