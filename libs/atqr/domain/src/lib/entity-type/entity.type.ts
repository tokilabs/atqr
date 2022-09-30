/**
 * This file uses typescript Utility Types to generate
 * dynamic types. Check the documentation for Utility types
 * to learn about them:
 *
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#thisparametertypetype
 */
import { Player } from '@atqr/domain';
import { Guid } from '@tokilabs/lang';

export type EntityProps<T> = {
  [P in keyof T]: T[P] extends Function ? never : T[P];
};

export type ConstructorProps<T extends new (...args: any) => any> = {
  [I in keyof ConstructorParameters<T>[0]]: ConstructorParameters<T>[0][I];
};

export type EntityDTO<T extends new (...args: any) => any> = EntityProps<
  InstanceType<T>
> &
  ConstructorProps<T> & { id: Guid }; //, typeof Entity>;
