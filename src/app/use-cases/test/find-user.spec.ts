import { beforeEach, describe, expect, it } from 'vitest';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';
import { FindUserUseCase } from '../users/find-user';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';

let userRepository: UserRepositoryInterface;
let useCase: FindUserUseCase;

describe('Caso de uso para busca de um usuário', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new FindUserUseCase(userRepository);
  });

  it('deve buscar um usuário pelo ID', async () => {
    const newUser = await userRepository.createUser({
      email: 'teste@gmail.com',
      name: 'Teste',
      password: '123456',
    });

    const user = await useCase.execute({ userId: newUser.id });

    expect(user).toEqual(newUser);
  });
});
