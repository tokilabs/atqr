import { Email, IMailer } from '@atqr/domain';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import Client from 'mailgun.js/client';
import MailgunError from '../../errors/mailgunError';

@Injectable()
export class Mailer implements OnApplicationBootstrap, IMailer {
  private mailgun: Mailgun;
  private client: Client;
  private domain: string;
  private apiKey: string;
  fromEmail: string;
  fromTitle: string;

  constructor(public configService: ConfigService) {}

  onApplicationBootstrap() {
    this.apiKey = this.configService.get<string>('MAILGUN_API_KEY');
    this.domain = this.configService.get<string>('MAILGUN_DOMAIN');
    this.fromEmail = this.configService.get<string>('FROM_EMAIL');
    this.fromTitle = this.configService.get<string>('FROM_TITLE');

    this.mailgun = new Mailgun(formData);

    this.client = this.mailgun.client({
      username: 'api',
      key: this.apiKey,
    });
  }

  async sendMail(email: Email) {
    const messageData = {
      from: this.fromEmail,
      to: email.email.value,
      subject: email.Subject,
      message: email.Message,
    };

    try {
      await this.client.messages.create(this.domain, messageData);
    } catch (error) {
      switch (error.status) {
        case 401:
          throw MailgunError.ConfigurationError(error);

        default:
          throw error;
      }
    }
  }
}
