import { Player } from "../../player";
import { Email } from "../email.service";
import { pathToTemplates } from "./includes/pathToTemplates";
import * as pug from "pug";
import * as path from "path";

const pugFile = pug.compileFile(
  path.join(pathToTemplates, 'supAccepted.pug')
);
export class SupervisorAccepted extends Email {

    constructor (to: Player["_email"]){
        super(to,
            'Supervisor aceitou seu convite...', pugFile({
              player: to,
            }))
    }
}
