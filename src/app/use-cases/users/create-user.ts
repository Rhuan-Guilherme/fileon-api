import { UserAlreadyExistsError } from '../../../exceptions/user-already-exists-error';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ email, name, password }: CreateUserRequest) {
    const findUserByEmail = await this.userRepository.findUserByEmail(email);

    if (findUserByEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.userRepository.createUser({
      email,
      name,
      password,
    });
  }
}
