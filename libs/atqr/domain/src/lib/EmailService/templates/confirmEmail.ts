import { Player } from "../../player";
import { Email } from "../email.service";
import { pugFile } from "./supConfirmation";

class ConfirmEmail extends Email {

    constructor (to: Player) {
        super(to,
            'Email de confirmação...', pugFile({
              player: to.name,
            }))
    }
}