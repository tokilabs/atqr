import Mailgun from 'mailgun.js';
import { Email } from '@atqr/domain';

import { ConfigService } from '@nestjs/config';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import Client from 'mailgun.js/client';
const formData = require('form-data');
@Injectable()
export class Mailer implements OnApplicationBootstrap {
  private mailgun: Mailgun;
  private client: Client;
  private domain: string;
  private apiKey: string;
  fromEmail: string;
  fromTitle: string;
  //options: { username; key }; remember configs

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
      subject: email.Subject,
      message: email.Message,
    };

    try {
      await this.client.messages.create(this.domain, messageData);
      console.log(messageData);
    } catch (error) {
      throw error;
    }
  }
}
