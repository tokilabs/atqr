// Goal Test if email service calls node mailgun correctly
// Strategy, mock the lib and see if the mock is called

import { ConfigService } from '@nestjs/config';
import { Mailer } from './mailer-sevice';
import { Email, EmailAddress, Player } from '@atqr/domain';
import * as EmailValidator from 'email-validator';
import { Test, TestingModule } from '@nestjs/testing';
import Mailgun from 'mailgun.js';

describe('Mailer', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const testMod: TestingModule = await Test.createTestingModule({
      providers: [
        Mailer,
        Mailgun,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'MAILGUN_API_KEY':
                  return 'key-4934ab4710c2f1b7d6d19a2a296f5502';
                case 'MAILGUN_DOMAIN':
                  return 'sandbox560ae9d2b6fa4d38a47d084825797bd8.mailgun.org';
                case 'FROM_EMAIL':
                  return 'contato@sandbox560ae9d2b6fa4d38a47d084825797bd8.mailgun.org';
                case 'FROM_TITLE':
                  return 'Ajoelhou Tem Que Rezar';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    configService = testMod.get<ConfigService>(ConfigService);
  });

  describe('Constructor', () => {
    it('Should build correctly', () => {
      // Arrange
      const mailer = new Mailer(configService);
      // Act
      // Assert
      expect(mailer).toBeDefined();
    });

    it('Should correctly instantiate the node-mailgun lib', () => {
      // Act
      const mailer = new Mailer(configService);
      mailer.onApplicationBootstrap();

      // Assert
      expect(mailer).toBeDefined();

      expect(mailer.fromEmail).toBe(
        'contato@sandbox560ae9d2b6fa4d38a47d084825797bd8.mailgun.org'
      );
      expect(mailer.fromTitle).toBe('Ajoelhou Tem Que Rezar');
    });
  });

  describe('sendMail()', () => {
    it('Should call nodemailer when called', async () => {
      // Arrange
      const mailer = new Mailer(configService);

      mailer.onApplicationBootstrap();

      jest.spyOn(mailer, 'sendMail');

      // Act
      const emailAddress = new EmailAddress('gabi@toki.life');
      const player = new Player('Gabriela', emailAddress);
      const myEmail = new Email(player, 'subject');
      await mailer.sendMail(myEmail);

      // Assert

      // Expect Nodemailer to be called

      // Expect Nodemailer to be called with correct arguments

      expect(mailer.sendMail).toBeCalledWith(
        'gabi@toki.life',
        'subject',
        undefined
      );
    });

    // Should Throw error on invalid data
    it('should throw data error', () => {
      // const emailAddress = new EmailAddress('gabi@toki.life'); // TODO: Rework test
      const isValidEmail = EmailValidator.validate('gab');

      expect(isValidEmail.valueOf).toThrow(Error);
    });

    //   //  Invalid Mail
    it('should throw email error', async () => {
      const mailer = new Mailer(configService);

      mailer.onApplicationBootstrap();

      const emailAddress = new EmailAddress('gabi@toki.life');
      const player = new Player('Gabriela', emailAddress);
      const myEmail = new Email(player, 'subject');

      async function myFunc() {
        return await mailer.sendMail(myEmail);
      }

      //await mailer.sendMail(myEmail);

      expect(myFunc).toThrow();
    });
    //   // Invalid Content
  });
});
