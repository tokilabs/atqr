import { Email, EmailAddress } from './email.interface';

// export class EmailService {
//   constructor(private mailTransporter: EmailTransporter) {}

//   sendMail(email: Email) {
//     try {
//       this.mailTransporter.sendMail(email);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }

export class ChallengeStarted implements Email {
  subject = 'Seu desafio do ATQR começou !';
  body = 'Text of welcome to the game';

  constructor(public to: EmailAddress) {}
}

export class SupConfirmation implements Email {
  subject = `Olá ${this.supervisorName}.
    Você foi convidado a ser supervisor de ${this.playerName}...`;
  body = 'Explicação do jogo';

  constructor(
    public to: EmailAddress,
    public playerName: string,
    public supervisorName: string
  ) {}
}

export class PayThePrice implements Email {
  subject = 'Não cumpriu o desafio';
  body = ' .... ';

  constructor(public to: EmailAddress) {}
}

export class Congrats implements Email {
  subject = 'Cumpriu o desafio';
  body = ' .... ';

  constructor(public to: EmailAddress) {}
}

export class YouWereChallenged implements Email {
  subject = 'Você foi desafiado';
  body = ' .... ';

  constructor(public to: EmailAddress) {}
}

export class DeadLineEmail implements Email {
  subject = 'E aí?';
  body = ' .... ';

  constructor(public to: EmailAddress) {}
}
