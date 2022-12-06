import { Player } from "../../player/player.entity";
import { Email } from "../email.service";
import { pugFile } from "./supConfirmation";

class ConfirmEmail extends Email {

    constructor (to: Player['_email']) {
        super(to,
            'Email de confirmação...', pugFile({
              player: to,
            }))
    }
}
