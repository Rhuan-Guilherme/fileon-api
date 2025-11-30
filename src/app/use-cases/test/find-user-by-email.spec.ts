import { beforeEach, describe, expect, it } from 'vitest';
import { FindUserByEmailUseCase } from '../users/find-user-by-email';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';

let userRepository: InMemoryUserRepository;
let useCase: FindUserByEmailUseCase;

describe('Caso de uso para busca de um usuário pelo e-mail', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new FindUserByEmailUseCase(userRepository);
  });

  it('deve buscar um usuário pelo e-mail', async () => {
    const newUser = {
      id: 'user-01',
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.users.push(newUser);

    const user = await useCase.execute({ email: 'teste@teste.com' });

    expect(user.email).toEqual('teste@teste.com');
    expect(user.name).toEqual('Teste');
  });

  it('deve lançar um erro caso não exista um e-mail cadastrado.', async () => {
    await expect(() =>
      useCase.execute({ email: 'non-existing-email' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
