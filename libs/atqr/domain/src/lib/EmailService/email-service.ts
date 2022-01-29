import { Email } from './email.interface';
import { EmailTransporter } from './emailTransporter.interface';

export const configs = {
  host = '',
  port = '',
  user = '',
  password = '',
};

/* transporter = nodemailer.createTransport({
  host: configs.host,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: configs.user,
    pass: configs.password,
  },
  logger: true,
}); */

export class EmailService {
  email: string; // it ill be type playerEmail | supervisorEmail (?)
  player: string; // ill be type Player from class  Player
  configs: object;

  constructor(private mailTransporter: EmailTransporter) {}

  sendMail() {
    try {
      this.mailTransporter.sendMail({
        to: 'to@example.com',
        from: '"Sender Name" <from@example.net>',
        subject: 'Hello from node',
        text: 'Hello world?',
        html: '<strong>Hello world?</strong>',
        headers: { 'x-myheader': 'test header' },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export class ChallengeStarted implements Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Seu desafio do ATQR começou !';
  message: 'Text of welcome to the game';
}

export class SupConfirmation implements Email {
  to: string; // It ill be type SupervisorEmail from class Player
  subject: 'Você foi convidado a ser supervisor de ${playerName}...';
  message: 'Explicação do jogo';
}

export class PayThePrice implements Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Não cumpriu o desafio';
  message: ' .... ';
}

export class Congrats implements Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Cumpriu o desafio';
  message: ' .... ';
}

export class YouWereChallenged implements Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Você foi desafiado';
  message: ' .... ';
}

export class DeadLineEmail implements Email {
  to: string; // It ill be type supervisorEmail from class Player
  subject: 'E aí?';
  message: ' .... ';
}
