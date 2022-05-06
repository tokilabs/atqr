import { EmailAddress } from '../EmailService';
import { Player } from './player';

describe('Testing the class Player', () => {
  const email = new EmailAddress('example@gmail.com');

  it('Should not be nameless', () => {
    expect(() => {
      new Player('', email);
    }).toThrowError('Player requires a name');
  });
  it('Should requires an email', () => {
    expect(() => {
      new Player('angel', null);
    }).toThrowError('Player requires an email');
  });
});
