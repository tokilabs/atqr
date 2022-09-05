import { ChallengeStatus } from '@atqr/domain';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UpdateChallengeDto } from '../dtos';

@Injectable()
export class PatchMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body: UpdateChallengeDto = req.body;

    if (Object.keys(body).length == 0) {
      body.case = undefined;
    }
    if (body.challengeStatus) {
      console.log(body.challengeStatus[0]);
      if (body.challengeStatus[0] === ChallengeStatus.Ongoing) {
        body.case = 1;
      }
    }

    if (body.updateCreditCard) {
      if (Object.keys(body.updateCreditCard).length == 2) {
        body.case = 2;
      }
    }
    if (body.updateSupervisor) {
      body.case = 3;
    }

    next();
  }
}
