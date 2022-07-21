import { IEmail } from '.';
import { Player } from '../player/player.entity';
import * as EmailValidator from 'email-validator';

export interface IMailer {
  sendMail(email: Email): Promise<unknown>;
}

export class EmailAddress {
  email: any;

  constructor(email: any) {
    const isValidEmail = EmailValidator.validate(email);

    if (isValidEmail) {
      this.email = email;
    } else {
      throw new Error('Invalid Email');
    }
  }
}
export class Email implements IEmail {
  constructor(
    public to: Player,
    public subject: string,
    public message?: string
  ) {
    this.to = to;
    this.subject = subject;
    this.message = message;
  }

  public get playerEmail() {
    return this.to.emailAddress.value;
  }

  public get from() {
    return process.env.FROM_EMAIL;
  }

  public get Subject() {
    return this.subject;
  }

  public get Message() {
    return this.message;
  }
}

export class ChallengeStarted extends Email {
  constructor(to: Player) {
    super(to, 'Seu desafio começou', 'Mensagem de boas vindas');
  }
}

export class SupConfirmation extends Email {
  constructor(to: Player) {
    super(
      to,
      'Você foi convidado a ser supervisor de ${playerName}...',
      'Explicação do jogo'
    );
  }
}

export class PayThePrice extends Email {
  constructor(to: Player) {
    super(to, 'Não cumpriu o desafio', ' .... ');
  }
}

export class Congrats extends Email {
  constructor(to: Player) {
    super(to, 'Cumpriu o desafio', ' .... ');
  }
}

export class YouWereChallenged extends Email {
  constructor(to: Player) {
    super(to, 'Você foi desafiado', ' .... ');
  }
}

export class DeadLineEmail extends Email {
  constructor(to: Player) {
    super(to, 'E aí?', ' .... ');
  }
}
