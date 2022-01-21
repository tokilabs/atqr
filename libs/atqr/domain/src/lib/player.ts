import { Guid } from 'guid-typescript';

export class Player{
  #id: Guid;
  #name: string;
  #email: string;
  #challenges: [];

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get challenges() {
    return this.#challenges;
  }

 constructor(id: Guid, name: string, email: string, challenge: []) {
   this.#id = id;
   this.#name = name;
   this.#email = email;
   this.#challenges = challenge;
 }
}

