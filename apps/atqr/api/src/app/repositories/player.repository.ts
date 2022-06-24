import { Challenge, EmailAddress, Player } from '@atqr/domain';
import { Injectable } from '@nestjs/common';
import { Guid } from '@tokilabs/lang';

import { PrismaService } from '../infra/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PlayerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUnique(id: Guid): Promise<Player> {
    return plainToInstance(
      Player,
      await this.prismaService.player.findUnique({
        where: { id: id.valueOf() },
        include: {
          Challenges: true,
        },
      }),
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
        where: { email: email.email },
      })
    );
  }

  // TODO: Discuss with Saulo if this method should return
  create(player: Player): void {
    this.prismaService.player.create({
      data: {
        id: player.id.valueOf(),
        name: player.name,
        email: player.emailAddress.email,
      },
    });
  }
}
