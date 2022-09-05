import { ChallengeStatus } from '@atqr/domain';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import { UpdateChallengeDto, UpdateCreditCardTokenDto } from '../dtos';

@Injectable()
export class PatchMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body: UpdateChallengeDto = req.body;

    if (Object.keys(body).length == 0) {
      console.log('função x');
    }
    if (body.challengeStatus) {
      if (body.challengeStatus[0] === ChallengeStatus.Ongoing) {
        req.body.case = 1;
      }
    }

    if (body.updateCreditCard) {
      if (Object.keys(body.updateCreditCard).length == 2) {
        console.log('função credit');
        req.body.case = 2;
      }
      console.log('is missing');
    }
    if (body.updateSupervisor) {
      console.log('função supervisor');
      req.body.case = 3;
    }

    next();
  }
}
