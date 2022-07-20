// Goal Test if email service calls node mailgun correctly
// Strategy, mock the lib and see if the mock is called
import { Email, EmailAddress, Player } from '@atqr/domain';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import Mailgun from 'mailgun.js';
import APIError from 'mailgun.js/lib/error';

import { Mailer } from './mailer.service';

// import APIError from './mailgunApiErrors';

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
    it('Should correctly instantiate the node-mailgun lib', () => {
      // Act
      const mailer = new Mailer(configService);
      mailer.onApplicationBootstrap();

      // Assert

      expect(mailer.fromEmail).toBe(
        'contato@sandbox560ae9d2b6fa4d38a47d084825797bd8.mailgun.org'
      );
      expect(mailer.fromTitle).toBe('Ajoelhou Tem Que Rezar');
    });
  });

  describe('sendMail()', () => {
    it('Should call Mailgun when called', async () => {
      const mailer = new Mailer(configService);

      mailer.onApplicationBootstrap();
      jest
        .spyOn(mailer['client']['messages'], 'create')
        .mockImplementation((domain: string, data: any): Promise<any> => {
          return new Promise((resolve) => {
            resolve({
              message: 'Queued. Thank you.',
              id: '<20111114174239.25659.5817@samples.mailgun.org>',
            });
          });
        });

      jest.spyOn(mailer, 'sendMail');

      // Act
      const emailAddress = new EmailAddress('gabi@toki.life');
      const player = new Player('Gabriela', emailAddress);
      const myEmail = new Email(player, 'subject');
      await mailer.sendMail(myEmail);

      expect(mailer['client'].messages.create).toBeCalledWith(
        process.env.MAILGUN_DOMAIN,
        {
          from: process.env.FROM_EMAIL,
          to: 'gabi@toki.life',
          subject: 'subject',
          message: undefined,
        }
      );
    });

    // Should Throw error on invalid data
    it('should throw email error when create func is rejected', async () => {
      const mailer = new Mailer(configService);

      mailer.onApplicationBootstrap();

      const emailAddress = new EmailAddress('gabi@toki.life');
      const player = new Player('Gabriela', emailAddress);
      const myEmail = new Email(player, 'subject');

      jest
        .spyOn(mailer['client'].messages, 'create')
        .mockImplementation((domain, data) => {
          return new Promise((resolve, reject) => {
            reject(
              new APIError({
                status: 401,
                statusText: '',
                message: '',
                headers: {},
                body: {},
                url: '',
              })
            );
          });
        });

      async function myFunc() {
        return await mailer.sendMail(myEmail);
      }

      await expect(myFunc()).rejects.toThrow();
    });
    //   // Invalid Content
  });
});
