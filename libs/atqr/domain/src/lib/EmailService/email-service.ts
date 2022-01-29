import { Email, EmailAddress } from './email.interface';
import { EmailTransporter } from './emailTransporter.interface';


export const configs = {
  host = '',
  port = '',
  user = '',
  password = '',
};



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
  subject: 'Seu desafio do ATQR começou !';
  message: 'Text of welcome to the game';
  
  constructor (
    public to: EmailAddress
  ) {}
}

export class SupConfirmation implements Email {
  
  subject: 'Você foi convidado a ser supervisor de ${playerName}...';
  message: 'Explicação do jogo';

  constructor (
    public to: EmailAddress 
  ) {}
}

export class PayThePrice implements Email {
  
  subject: 'Não cumpriu o desafio';
  message: ' .... ';

  constructor (
    public to: EmailAddress 
  ) {}
}

export class Congrats implements Email {
  subject: 'Cumpriu o desafio';
  message: ' .... ';

  constructor (
    public to: EmailAddress 
  ) {}
}

export class YouWereChallenged implements Email {
  subject: 'Você foi desafiado';
  message: ' .... ';

  constructor (
    public to: EmailAddress 
  ) {}
}

export class DeadLineEmail implements Email {
  subject: 'E aí?';
  message: ' .... ';

  constructor (
    public to: EmailAddress 
  ) {}
}
