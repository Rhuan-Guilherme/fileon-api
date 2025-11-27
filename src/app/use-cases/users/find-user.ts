import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';

interface FindUserRequest {
  userId: string;
}

export class FindUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  execute({ userId }: FindUserRequest) {
    const user = this.userRepository.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
