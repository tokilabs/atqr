import { Guid } from "guid-typescript";


export class Challenge {
  id: Guid;
  goal: string;
  deadline: Date;
  price: number;
  supervisorName: string;
  supervisorEmail: string;
  player: Player;
  paymentMethod: PaymentMethod;

  constructor(id, goal, deadline, price, supervisorName, supervisorEmail, player, paymentMethod) {
    this.id = Guid.create();
    this.goal = goal;
    this.deadline = deadline;
    this.price = price;
    this.supervisorName = supervisorName;
    this.supervisorEmail = supervisorEmail;
    this.player = player;
    this.paymentMethod = paymentMethod;
  }

  changeSupervisor(newSupervisorName:string, newSupervisorEmail:string){
    this.supervisorName = newSupervisorName
    this.supervisorEmail = newSupervisorEmail
  }

  changePaymentMethod(this.paymentMethod, newPaymentMethod){
    const newPaymentMethod = new PaymentMethod;
    this.paymentMethod = newPaymentMethod;

  }


}
