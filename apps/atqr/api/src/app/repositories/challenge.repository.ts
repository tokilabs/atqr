import { Injectable } from '@nestjs/common';
import { Guid } from '@tokilabs/lang';
import { plainToInstance } from 'class-transformer';
import { Challenge } from 'libs/atqr/domain/src/lib/challenge-entity/challenge-entity';
import { Challenge as PrismaChallenge } from '@prisma/client';

import { PrismaService } from '../infra/database/prisma.service';

@Injectable()
export class ChallengeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(challenge: Challenge): void {
    this.prismaService.challenge.create({
      data: {
        id: challenge.id.valueOf(),
        deadline: challenge.deadline,
        goal: challenge.goal,
        price: challenge.price,
        paymentMethod: 'asdasd', // Resolve entity
        supervisorName: challenge.supervisorName,
        supervisorEmail: challenge.supervisorEmail,
        status: challenge.status,
        creditCardToken: challenge.paymentMethod.getToken(),
        player: {
          connect: {
            email: challenge.player.emailAddress.email,
          },
        },
      },
    });
  }

  async findLastChallenges(amount: number): Promise<Challenge[]> {
    const plainChallenges: PrismaChallenge[] =
      await this.prismaService.challenge.findMany({
        orderBy: {
          id: 'desc',
        },
      });

    return plainChallenges.map((challenge) => {
      return plainToInstance(Challenge, challenge);
    });
  }

  async findMany(numberOfResults = 100): Promise<Challenge[]> {
    // Cursor or Offset based pagination?
    // As the change is quite easy i'll implement Offset based pagination and will change later if need arises

    const plainChallenges: PrismaChallenge[] =
      await this.prismaService.challenge.findMany({
        take: numberOfResults,
      });

    return plainChallenges.map((challenge) => {
      return plainToInstance(Challenge, challenge);
    });
  }

  async findUnique(id: Guid): Promise<Challenge> {
    return plainToInstance(
      Challenge,
      await this.prismaService.challenge.findUnique({
        where: { id: id.valueOf() },
        include: { player: true },
      })
    );
  }

  async findOngoingChallenges(
    deadline: Date,
    numberOfResults = 100,
    skip = 0
  ): Promise<Challenge[]> {
    const plainChallenges = await this.prismaService.challenge.findMany({
      take: numberOfResults,
      skip,
      where: {
        deadline: {
          gt: deadline,
        },
        status: { equals: 'Ongoing' },
      },
    });
    return plainChallenges.map((challenge) => {
      return plainToInstance(Challenge, challenge);
    });
  }

  update(challenge: Challenge): void {
    this.prismaService.challenge.update({
      where: { id: challenge.id.valueOf() },
      data: {
        creditCardToken: challenge.paymentMethod.getToken(),
        status: challenge.status.toString(),
      },
    });

    async function main() {
      // await this.create({ data: {} })
    };

    try {

    }
    catch(e) {

    }
    finally {
      
    }
  }
}
