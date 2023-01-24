import { EmailAddress } from '../emailTemplates';
import { Player } from './player.entity';

describe('Testing the Player class', () => {
  it('Should not be nameless', () => {
    expect(() => {
      new Player('', new EmailAddress('test@test.com'));
    }).toThrowError('Invalid parameter values for: _name.');
  });

  it('Should requires an email', () => {
    expect(() => {
      new Player('Angel', null);
    }).toThrowError('Invalid parameter values for: _email.');
  });

  it('Should return all parameter errors', () => {
    expect(() => {
      new Player('', null);
    }).toThrowError(/Invalid parameter values for: (_email|_name|,\s)+./);
  });
});
