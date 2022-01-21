export class EmailService {
  email: string; // it ill be type playerEmail | supervisorEmail (?)
  player: string; // ill be type Player from class  Player
}

export class Email {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string
  ) {}
}

export class ChallengeStarted extends Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Seu desafio do ATQR começou !';
  message: 'Text of welcome to the game';
  from: string //atqr email

  constructor (to: string, subject: string, message: string, from: string){
      super();
  }
}

export class SupConfirmation extends Email {
  to: string; // It ill be type SupervisorEmail from class Player
  subject: 'Você foi convidado a ser supervisor de ${playerName}...';
  message: 'Explicação do jogo';
  
}

export class PayThePrice extends Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Não cumpriu o desafio';
  message: ' .... ';
}

export class Congrats extends Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Cumpriu o desafio';
  message: ' .... ';
}

export class YouWereChallenged {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Você foi desafiado';
  message: ' .... ';
}

export class DeadLineEmail extends Email {
  to: string; // It ill be type supervisorEmail from class Player
  subject: 'E aí?';
  message: ' .... ';
}
