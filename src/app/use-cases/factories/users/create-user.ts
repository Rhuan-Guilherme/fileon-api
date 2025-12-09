import { PrismaUserRepository } from '../../../repositories/prisma/prisma-user-repository';
import { CreateUserUseCase } from '../../_users/create-user';

export function CreateUserFactory() {
  const userRepository = new PrismaUserRepository();
  const userUseCase = new CreateUserUseCase(userRepository);

  return userUseCase;
}
