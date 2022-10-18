import { Challenge, IChallengeRepository } from '@atqr/domain';
import { Injectable } from '@nestjs/common';
import { Challenge as PrismaChallenge, ChallengeStatus } from '@prisma/client';
import { Guid } from '@tokilabs/lang';
import { plainToInstance } from 'class-transformer';
import { EntityDTO } from 'libs/atqr/domain/src/lib/entity-type/entity.type';
import { PrismaService } from '../infra/database/prisma.service';

@Injectable()
export class ChallengeRepository implements IChallengeRepository {
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

    return Challenge.createFromObject(plainChallenges);
  }

  async findMany(numberOfResults = 100): Promise<Challenge[]> {
    // Cursor or Offset based pagination?
    // As the change is quite easy i'll implement Offset based pagination and will change later if need arises

    const plainChallenges: PrismaChallenge[] =
      await this.prismaService.challenge.findMany({
        take: numberOfResults,
      });

    return Challenge.createFromObject(plainChallenges);
  }

  async findUnique(id: Guid): Promise<Challenge> {
    let prismaChallenge = await this.prismaService.challenge.findUnique({
      where: { id: id.valueOf() },
      // include: { player: true },
    });
    return Challenge.createFromObject(prismaChallenge);
  }

  async findOverdueChallenges(
    numberOfResults = 100,
    skip = 0
  ): Promise<Challenge[]> {
    const prismaChallenges = await this.prismaService.challenge.findMany({
      take: numberOfResults,
      skip,
      where: {
        deadline: {
          lt: new Date(),
        },
        status: { equals: 'Ongoing' },
      },
      include: { player: true },
    });
    return prismaChallenges.map((pc) => {
      return plainToInstance(Challenge, pc);
      // TODO: Finalize Conversion from prisma entity to domain entity
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    });
  }

  update(challenge: Challenge) {
    this.prismaService.challenge.update({
      where: { id: challenge.id.valueOf() },
      data: {
        creditCardToken: challenge.paymentMethod.getToken(),
        status: ChallengeStatus[challenge.status], // TODO: Check if this assumption will always be true
      },
    });
  }
}
