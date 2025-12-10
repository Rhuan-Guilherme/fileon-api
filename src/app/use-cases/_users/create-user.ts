import type { UserRepositoryInterface } from '@/app/repositories/user-repository-interface';
import { UserAlreadyExistsError } from '@/exceptions/user-already-exists-error';
import { hash } from 'bcryptjs';

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

    const passwordHash = await hash(password, 8);

    await this.userRepository.createUser({
      email,
      name,
      password: passwordHash,
    });
  }
}
