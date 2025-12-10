import type { UserRepositoryInterface } from '@/app/repositories/user-repository-interface';
import { ResourceNotFoundError } from '@/exceptions/resource-not-found-error';

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ email }: { email: string }) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new ResourceNotFoundError('User');
    }

    return user;
  }
}
