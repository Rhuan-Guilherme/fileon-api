import { compare } from 'bcryptjs';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';
import { InvalidCredentialsError } from '../../../exceptions/invalid-credentials-error';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ email, password }: AuthenticateUserRequest) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new InvalidCredentialsError();
    }
    return user;
  }
}
