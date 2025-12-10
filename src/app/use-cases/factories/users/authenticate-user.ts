import { PrismaUserRepository } from '../../../repositories/prisma/prisma-user-repository';
import { AuthenticateUserUseCase } from '../../_users/authenticate-user';

export function makeAuthenticateUserFactory() {
  const userRepository = new PrismaUserRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

  return authenticateUserUseCase;
}
