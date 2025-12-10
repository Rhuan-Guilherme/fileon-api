import type { User } from '../../../generated/prisma/client';
import { prisma } from '../../../lib/prisma';
import type { UserRepositoryInterface } from '../user-repository-interface';

export class PrismaUserRepository implements UserRepositoryInterface {
  async findUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email!,
        name: data.name!,
        password: data.password!,
      },
    });

    return user;
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });

    return user;
  }
}
