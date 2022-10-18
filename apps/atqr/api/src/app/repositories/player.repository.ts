import { Player } from '@atqr/domain';
import { Injectable } from '@nestjs/common';
import { Player as PrismaPlayer } from '@prisma/client';
import { Guid } from '@tokilabs/lang';
import {
  PartialPlayer,
  PlayerRequiredProps,
} from 'libs/atqr/domain/src/lib/entities/player';
import { PrismaService } from '../infra/database/prisma.service';
import { EmailAddress } from 'libs/atqr/domain/src/lib/valueObjects/emailAddress';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PlayerRepository implements IPlayerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // static convert(prismaPlayer: PrismaPlayer): PartialPlayer {
  //   const partialPlayer: PartialPlayer = {
  //     name: prismaPlayer.name,
  //     id: new Guid(prismaPlayer.id),
  //     email: new EmailAddress(prismaPlayer.email),
  //   };
  //   return partialPlayer;
  // }
  async findUnique(id: Guid): Promise<Player> {
    const prismaPlayer: PrismaPlayer =
      await this.prismaService.player.findUnique({
        where: { id: id.valueOf() },
        include: {
          Challenges: true,
        },
      });

    return plainToInstance(Player, prismaPlayer);

    //  const prismaaPlayer = {
    //   id: prismaPlayer.id,
    //   name: prismaPlayer.name,
    //   email: new EmailAddress(prismaPlayer.email)

    // }
  }

  async findByEmail(email: EmailAddress): Promise<Player> {
    const prismaPlayer = await this.prismaService.player.findUnique({
      where: { email: email.value },
    });
    return plainToInstance(Player, prismaPlayer);
  }

  // TODO: Discuss with Saulo if this method should return
  create(player: Player): void {
    this.prismaService.player.create({
      data: {
        id: player.id.valueOf(),
        name: player.name,
        email: player.email.value,
      },
    });
  }
}
