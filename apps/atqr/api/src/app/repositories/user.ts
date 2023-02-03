import { Injectable } from '@nestjs/common';
import { Guid } from '@tokilabs/lang';
import { plainToInstance } from 'class-transformer';
import { IUserRepository, User } from '@atqr/domain';
import { PrismaService } from '../infra';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User): Promise<void> {
    try {
      const prismaUser = await this.prismaService.user.create({
        data: {
          id: user.id.valueOf(),
          userName: user.userName,
          email: user.email.emailAddress,
          emailConfirmed: user.emailConfirmed,
          paymentMethod: user.paymentMethod,
        },
      });
      prismaUser;
    } catch (error) {
      throw Error('Could not create new User');
    }
  }

  async findManyUsersContenders(
    user: User,
    numberOfResults = 100
  ): Promise<User[]> {
    try {
      const plainUserContender = await this.prismaService.user.findMany({
        where: user.playedChallenges[numberOfResults],
        orderBy: {
          id: 'desc',
        },
      });

      return plainUserContender.map((user) => {
        return plainToInstance(User, user);
      });
    } catch (error) {
      throw Error('Could not find Users that are Contenders');
    }
  }

  async findManyUsersJudges(
    user: User,
    numberOfResults = 100
  ): Promise<User[]> {
    try {
      const plainUserJudge = await this.prismaService.user.findMany({
        where: user.officiatedChallenges[numberOfResults],
        orderBy: {
          id: 'desc',
        },
      });

      return plainUserJudge.map((user) => {
        return plainToInstance(User, user);
      });
    } catch (error) {
      throw Error('Could not find Users that are Judges');
    }
  }

  async findManyUsersOrganizingChallenges(
    user: User,
    numberOfResults?: number
  ): Promise<User[]> {
    try {
      const plainUser = await this.prismaService.user.findMany({
        where: user.officiatedChallenges[numberOfResults],
        orderBy: {
          id: 'desc',
        },
      });

      return plainUser.map((user) => {
        return plainToInstance(User, user);
      });
    } catch (error) {
      throw Error('Could not find Users that are organizing Challenges');
    }
  }

  async findUniqueUser(id: Guid): Promise<User> {
    try {
      return plainToInstance(
        User,
        await this.prismaService.user.findUnique({
          where: { id: id.valueOf() },
        })
      );
    } catch (error) {
      throw Error('Could not find User');
    }
  }

  async findUniqueUserPaymentMethod(user: User): Promise<User> {
    try {
      return plainToInstance(
        User,
        await this.prismaService.user.findUnique({
          where: user.paymentMethod,
        })
      );
    } catch (error) {
      throw Error('Could not find User payment method');
    }
  }

  async findUniqueUserEmail(user: User): Promise<User> {
    try {
      return plainToInstance(
        User,
        await this.prismaService.user.findUnique({
          where: {
            email: user.email.emailAddress,
          },
        })
      );
    } catch (error) {
      throw Error('Could not find User email');
    }
  }

  async updateUserPaymentMethod(user: User) {
    try {
      await this.prismaService.user.update({
        where: {
          id: user.id.valueOf(),
        },
        data: {
          paymentMethod: user.paymentMethod,
        },
      });
    } catch (error) {
      throw Error('Could not update payment method');
    }
  }
}
