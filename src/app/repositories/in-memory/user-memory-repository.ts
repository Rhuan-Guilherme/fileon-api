import { randomUUID } from 'node:crypto';
import type { UserRepositoryInterface } from '../user-repository-interface';
import type { User } from '@/generated/prisma/client';

export class InMemoryUserRepository implements UserRepositoryInterface {
  public users: User[] = [];

  async findUserById(userId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId) || null;

    if (!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email) || null;

    if (!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve(user);
  }

  async createUser(data: Partial<User>): Promise<User> {
    const newUser: User = {
      id: data.id || randomUUID(),
      password: data.password || '',
      email: data.email || '',
      name: data.name || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    const updatedUser: User = { ...this.users[userIndex], ...data } as User;
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }
}
