import { PrismaUserRepository } from '../../../repositories/prisma/prisma-user-repository';
import { CreateUserUseCase } from '../../_users/create-user';

export function makeCreateUserFactory() {
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase;
}
