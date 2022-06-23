import { Injectable, Redirect } from '@nestjs/common';
import { Guid } from '@tokilabs/lang';
import { Post, Get, Put } from '@nestjs/common';
import { create } from 'domain';
import { Challenge } from 'libs/atqr/domain/src/lib/challenge-entity';
import { CreateChallengeDto } from '../dtos/createChallenge.dto';
import { PrismaService } from '../infra/database/prisma.service';

@Injectable()
export class ChallengeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('chellenge/create')
  create(challenge: Challenge) {
    this.prismaService.challenge.create({
      data: {
        id: challenge.id.valueOf(),
        deadline: challenge.deadline,
        goal: challenge.goal,
        price: challenge.price.toString(),
        //paymentMethod, // Resolve entity
        supervisorName: challenge.supervisorName,
        supervisorEmail: challenge.supervisorEmail,
        status: challenge.status,
        creditCardToken: challenge.paymentMethod.getToken(),
        player: {
          connectOrCreate: {
            where: {
              email: challenge.player.emailAddress,
            },
            create: {
              id: challenge.player.id.valueOf(),
              name: challenge.player.name,
              email: challenge.player.emailAddress,
            },
          },
        },
      },
    });
  }

  

  @Get('challenge/find-many/:id')
  findMany(numberOfResults = 100) {
    // Cursor or Offset based pagination?
    // As the change is quite easy i'll implement Offset based pagination and will change later if need arises
    return this.prismaService.challenge.findMany({
      take: numberOfResults,
    });
  }

  @Get('challenge/:id')
  findUnique(id: Guid) {
    return this.prismaService.challenge.findUnique({
      where: { id: id.valueOf() },
      include: { player: true },
    });
  }

  @Get('challenge/ongoing/:id')
  findOngoingChallenges(deadline: Date, numberOfResults = 100, skip = 0) {
    return this.prismaService.challenge.findMany({
      take: numberOfResults,
      skip,
      where: {
        deadline: {
          gt: deadline,
        },
        status: { equals: 'Ongoing' },
      },
    });
  }

  @Put('challenge/update/:id')
  update(challenge: Challenge) {
    this.prismaService.challenge.update({
      where: { id: challenge.id.valueOf() },
      data: {
        creditCardToken: challenge.paymentMethod.getToken(),
        status: challenge.status,
      },
    });
  }
}
