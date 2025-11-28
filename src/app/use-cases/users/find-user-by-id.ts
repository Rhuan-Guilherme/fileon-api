import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';

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
