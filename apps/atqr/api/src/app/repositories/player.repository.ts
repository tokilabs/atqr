import { EmailAddress, Player } from '@atqr/domain';
import { Injectable } from '@nestjs/common';
import { Guid } from '@tokilabs/lang';

import { PrismaService } from '../infra/database/prisma.service';

@Injectable()
export class PlayerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUnique(id: Guid): Player {
    return this.prismaService.player.findUnique({
      where: { id: id.valueOf() },
    });
  }

  findByEmail(email: EmailAddress): Player {
    return this.prismaService.player.findUnique({
      where: { email: email.email },
    });
  }

  create(player: Player): Player {
    return this.prismaService.player.create({
      data: {
        id: player.id.valueOf(),
        name: player.name,
        email: player.emailAddress,
      },
    });
  }
}
