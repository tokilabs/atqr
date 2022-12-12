export interface IEmailService {
  send(email: Email): Promise<unknown>;
}
