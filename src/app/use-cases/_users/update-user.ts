import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ id, ...data }: UpdateUserRequest) {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new ResourceNotFoundError('User not found');
    }

    const updatedUser = await this.userRepository.updateUser(id, data);
    return updatedUser;
  }
}
