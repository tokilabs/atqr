import {
  Challenge,
  EmailAddress,
  IPlayerRepository,
  Player,
} from '@atqr/domain';
import { Injectable } from '@nestjs/common';
import { Player as PrismaPlayer } from '@prisma/client';
import { Guid } from '@tokilabs/lang';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../infra/database/prisma.service';

@Injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUnique(id: Guid): Promise<Player> {
    const prismaPlayer: PrismaPlayer =
      await this.prismaService.player.findUnique({
        where: { id: id.valueOf() },
        include: {
          Challenges: true,
        },
      });

    return plainToInstance(
      Player,
      prismaPlayer,
      // TODO check the right syntax for targetMaps
      {
        targetMaps: [
          {
            target: () => EmailAddress,
            properties: {
              email: (value) => new EmailAddress(value),
            },
          },
          {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            target: () => {},
            properties: {
              Challenges: (value) => plainToInstance(Challenge, value),
            },
          },
        ],
      }
    );
  }

  findByEmail(email: EmailAddress): Player {
    return plainToInstance(
      Player,
      this.prismaService.player.findUnique({
        where: { email: email.value },
      })
    );
  }

  // TODO: Discuss with Saulo if this method should return
  create(player: Player): void {
    this.prismaService.player.create({
      data: {
        id: player.id.valueOf(),
        name: player.name,
        email: player.emailAddress.value,
      },
    });
  }
}

