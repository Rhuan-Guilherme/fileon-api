import { PrismaUserRepository } from '../../../repositories/prisma/prisma-user-repository';
import { UpdateUserUseCase } from '../../_users/update-user';

export function makeUpdateUserFactory() {
  const userRepository = new PrismaUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  return updateUserUseCase;
}
