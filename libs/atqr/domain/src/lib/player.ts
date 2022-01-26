import { Guid } from "@tokilabs/lang";
export class Player{


  constructor(private id: Guid, private name: string, private  email: string, private challenges:challenge[]) {}

  get _id() {
    return this.id;
  }

  get _name() {
    return this.name;
  }

  get _email() {
    return this.email;
  }

  get _challenges() {
    return this.challenges;
  }
  
}

