import * as nodemailer from 'nodemailer';



export const configs = {
  public host = '',
  public port = '',
  public user = '',
  public password = '',

}




export class EmailService {
  email: string; // it ill be type playerEmail | supervisorEmail (?)
  player: string; // ill be type Player from class  Player
  configs: object;
  
  
  const transporter = nodemailer.createTransport({
    host: configs.host,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: configs.user,
      pass: configs.password,
    },
    logger: true
  });

  
 
  
  const info =  await this.transporter.sendMail({
    from: '"Sender Name" <from@example.net>',
    to: "to@example.com",
    subject: "Hello from node",
    text: "Hello world?",
    html: "<strong>Hello world?</strong>",
    headers: { 'x-myheader': 'test header' }
  });

  
}


export class Email {
  constructor(
    private _from: string,
    private _to: string,
    private _subject: string,
    private _message?: string
  ) {}

    async mailOptions() {
    let mailOptions = {
      from: this._from,
      to: this._to,
      subject: this._subject,
      message: this._message,
    };
}


export class ChallengeStarted extends Email {
  private to: string; // It ill be type playerEmail from class Player
  private subject: 'Seu desafio do ATQR começou !';
  private message: 'Text of welcome to the game';
  private from: string; //atqr email

  constructor(from: string, to: string, subject: string, message?: string):Email {
    super(to, subject, message, from) 
  }
}

export class SupConfirmation extends Email {
  to: string; // It ill be type SupervisorEmail from class Player
  subject: 'Você foi convidado a ser supervisor de ${playerName}...';
  message: 'Explicação do jogo';

  constructor(to: string, subject: string, message: string){
    super(to, subject, message)
  }
}

export class PayThePrice extends Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Não cumpriu o desafio';
  message: ' .... ';

  constructor(to: string, subject: string, message: string){
    super(to, subject, message)
  }
}

export class Congrats extends Email {
  to: string; // It ill be type playerEmail from class Player
  subject: 'Cumpriu o desafio';
  message: ' .... ';

  constructor(to: string, subject: string, message: string){
    super(to, subject, message)
  }
}

export class YouWereChallenged extends Email {
  to: string  // It ill be type playerEmail from class Player
  subject: 'Você foi desafiado';
  message: ' .... ';

  constructor(to: string, subject: string, message: string){
    super(to, subject, message)
  }
}

export class DeadLineEmail extends Email {
  to: string; // It ill be type supervisorEmail from class Player
  subject: 'E aí?';
  message: ' .... ';

  constructor(to: string, subject: string, message: string){
    super(to, subject, message)
  }
}
