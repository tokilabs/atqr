import { ChallengeStatus } from "@atqr/domain";
import {ChallengeController} from "../../../../api/src/app/challenge.controller";
import { challenge } from "../challenge/challenge";


export class TimeForTheTruth {

    constructor( private  challengeController: ChallengeController)
    {}
     
    challenge = challenge
    
         congratsButton (){
           let challengeUpdated = this.challengeController.updateStatus(challenge, ChallengeStatus.Completed)
           return challengeUpdated
          }
        
         
      
           reproveButton (){
            let challengeUpdated = this.challengeController.updateStatus(challenge, ChallengeStatus.Failed)
            return challengeUpdated
         }
}

const congratsButton = document.getElementsByClassName('congratsButton');
const reproveButton = document.getElementsByClassName('reproveButton');



  
