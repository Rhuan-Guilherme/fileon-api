import type { UserRepositoryInterface } from '@/app/repositories/user-repository-interface';
import { ResourceNotFoundError } from '@/exceptions/resource-not-found-error';

interface FindUserRequest {
  userId: string;
}

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ userId }: FindUserRequest) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new ResourceNotFoundError('User');
    }

    return user;
  }
}
