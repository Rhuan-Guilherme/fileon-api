import { beforeEach, describe, expect, it } from 'vitest';
import { FindUserByIdUseCase } from '../users/find-user-by-id';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';

let userRepository: InMemoryUserRepository;
let useCase: FindUserByIdUseCase;

describe('Caso de uso para busca de um usuário ID', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new FindUserByIdUseCase(userRepository);
  });

  it('deve buscar um usuário pelo ID', async () => {
    const newUser = {
      id: 'user-01',
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.users.push(newUser);

    const user = await useCase.execute({ userId: 'user-01' });

    expect(user.email).toEqual('teste@teste.com');
    expect(user.name).toEqual('Teste');
  });

  it('deve lançar um erro se o usuário não for encontrado', async () => {
    await expect(() =>
      useCase.execute({ userId: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
