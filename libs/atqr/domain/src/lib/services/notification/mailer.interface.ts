import { Email } from "../../valueObjects";

export interface IMailer{
  sendMail(email: Email): void;
}
