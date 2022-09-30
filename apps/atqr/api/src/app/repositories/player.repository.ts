import {
  EmailAddress,
  IPlayerRepository,
  Player,
} from '@atqr/domain';
import { Injectable } from '@nestjs/common';
import { Player as PrismaPlayer } from '@prisma/client';
import { Guid } from '@tokilabs/lang';
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

    return Player.createFromObject(prismaPlayer);

    //  const prismaaPlayer = {
    //   id: prismaPlayer.id,
    //   name: prismaPlayer.name,
    //   email: new EmailAddress(prismaPlayer.email)

    // }
  }

  findByEmail(email: EmailAddress): Player {
    this.prismaService.player.findUnique({
      where: { email: email.value },
    });

    return Player.createFromObject(email);
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
