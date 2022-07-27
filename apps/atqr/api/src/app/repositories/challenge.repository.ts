import { Challenge } from '@atqr/domain';
import { Injectable } from '@nestjs/common';
import { Challenge as PrismaChallenge, ChallengeStatus } from '@prisma/client';
import { Guid } from '@tokilabs/lang';
import { plainToInstance } from 'class-transformer';
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
        paymentMethod: 'Not Finished', // TODO: Resolve entity
        supervisorName: challenge.supervisorName,
        supervisorEmail: challenge.supervisorEmail,
        status: ChallengeStatus[challenge.status], // TODO: Check if this assumption will always be true
        creditCardToken: challenge.paymentMethod.getToken(),
        player: {
          connect: {
            email: challenge.player.emailAddress.value,
          },
        },
      },
    });
  }

  async findLastChallenges(amount: number): Promise<Challenge[]> {
    const plainChallenges: PrismaChallenge[] =
      await this.prismaService.challenge.findMany({
        take: amount,
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

  findOverdueChallenges(numberOfResults = 100, skip = 0): Promise<Challenge[]> {
    return this.prismaService.challenge
      .findMany({
        take: numberOfResults,
        skip,
        where: {
          deadline: {
            lt: new Date(),
          },
          status: { equals: 'Ongoing' },
        },
        include: { player: true },
      })
      .then((prismaChallenges) => {
        return prismaChallenges.map((pc) => {
          plainToInstance(Challenge, prismaChallenges);
          return pc as any as Challenge;
        });
      });
  }

  update(challenge: Challenge): void {
    this.prismaService.challenge.update({
      where: { id: challenge.id.valueOf() },
      data: {
        creditCardToken: challenge.paymentMethod.getToken(),
        status: ChallengeStatus[challenge.status], // TODO: Check if this assumption will always be true
      },
    });
  }
}
