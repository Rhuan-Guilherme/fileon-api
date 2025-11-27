import { beforeEach, describe, expect, it } from 'vitest';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';
import { FindUserUseCase } from '../users/find-user';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';

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

  it('deve lançar um erro se o usuário não for encontrado', async () => {
    await expect(() =>
      useCase.execute({ userId: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
