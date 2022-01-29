import { Challenge } from '@atqr/domain';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateChallengeDto } from './dtos/createChallenge.dto';
import { UpdateCreditCardTokenDto } from './dtos/updateCreditCardToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('challenge')
  async createChallenge(
    @Body() createChallenge: CreateChallengeDto
  ): Promise<Challenge> {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }

  @Get('challenge/:id')
  getChallenge(@Param('id') id: string): Challenge {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }

  @Patch('challenge/:id')
  async updateChallenge(
    @Param('id') id: string,
    @Body() updateCreditCardTokenDto: UpdateCreditCardTokenDto
  ): Promise<Challenge> {
    return {} as Challenge; // ME DELETE QUANDO FOR IMPLEMENTAR
  }
}
