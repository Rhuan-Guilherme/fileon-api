import type { User } from '../../generated/prisma/client';

export interface UserRepositoryInterface {
  findUserById(userId: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: Partial<User>): Promise<User>;
  updateUser(userId: string, data: Partial<User>): Promise<User>;
}
