import { Player } from "../../player";
import { Email } from "../email.service";
import { pugFile } from "./supConfirmation";

export class SupervisorAccepted extends Email {

    constructor (to: Player["_email"]){
        super(to,
            'Supervisor aceitou seu convite...', pugFile({
              player: to,
            }))
    }
}
