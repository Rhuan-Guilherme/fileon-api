import { beforeEach, describe, expect, it } from 'vitest';
import type { UserRepositoryInterface } from '../../repositories/user-repository-interface';
import { FindUserByEmailUseCase } from '../users/find-user-by-email';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';

let userRepository: UserRepositoryInterface;
let useCase: FindUserByEmailUseCase;

describe('Caso de uso para busca de um usuário pelo e-mail', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new FindUserByEmailUseCase(userRepository);
  });

  it('deve buscar um usuário pelo e-mail', async () => {
    await userRepository.createUser({
      id: 'user-1',
      email: 'teste@gmail.com',
      name: 'Teste',
      password: '123456',
    });

    const user = await useCase.execute({ email: 'teste@gmail.com' });

    expect(user.email).toEqual('teste@gmail.com');
    expect(user.name).toEqual('Teste');
  });

  it('deve lançar um erro caso não exista um e-mail cadastrado.', async () => {
    await expect(() =>
      useCase.execute({ email: 'non-existing-email' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
