import {Challenge } from './challenge-entity';
import { Player } from './player';
import { Guid } from '@tokilabs/lang/';
test('Create and call a new challenge', () => {
  const a = new Challenge('amar menos', new Date(), 'meuSupervisor', 'emailSupervisor', new Player('fulano', 'email@hotmail.com'), new Guid, 30)
  const mock = jest.fn()
  mock(a)
  expect(mock).toBeCalled()
})
test('throws a error on price < 24', () => {
  expect(() => new Challenge('amar menos', new Date(), 'meuSupervisor', 'emailSupervisor', new Player('fulano', 'email@hotmail.com'), new Guid, 20)).toThrow('Selecione um valor acima de 25 reais')
});

// jest.mock('@tokilabs/lang/')
// it('should return a valid id', () => {
//   tokilabs.mockImplem
// })









