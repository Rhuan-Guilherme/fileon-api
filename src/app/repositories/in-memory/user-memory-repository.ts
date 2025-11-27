import { randomUUID } from 'node:crypto';
import type { User } from '../../../generated/prisma/client';
import type { UserRepositoryInterface } from '../user-repository-interface';

export class InMemoryUserRepository implements UserRepositoryInterface {
  public users: User[] = [];

  async findUserById(userId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId) || null;

    if (!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user);
  }

  async createUser(data: Partial<User>): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      password: data.password || '',
      email: data.email || '',
      name: data.name || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return Promise.resolve(newUser);
  }
}
