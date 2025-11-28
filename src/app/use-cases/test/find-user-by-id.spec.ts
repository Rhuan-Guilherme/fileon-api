import { beforeEach, describe, expect, it } from 'vitest';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';
import { FindUserByIdUseCase } from '../users/find-user-by-id';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';

let userRepository: UserRepositoryInterface;
let useCase: FindUserByIdUseCase;

describe('Caso de uso para busca de um usuário ID', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new FindUserByIdUseCase(userRepository);
  });

  it('deve buscar um usuário pelo ID', async () => {
    await userRepository.createUser({
      id: 'user-1',
      email: 'teste@gmail.com',
      name: 'Teste',
      password: '123456',
    });

    const user = await useCase.execute({ userId: 'user-1' });

    expect(user.email).toEqual('teste@gmail.com');
    expect(user.name).toEqual('Teste');
  });

  it('deve lançar um erro se o usuário não for encontrado', async () => {
    await expect(() =>
      useCase.execute({ userId: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
