import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { CreateUserUseCase } from '../users/create-user';

let userRepository: InMemoryUserRepository;
let useCase: CreateUserUseCase;

describe('Caso de uso para criação de um usuário', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(userRepository);
  });

  it('deve criar um novo usuário', async () => {
    await useCase.execute({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '123456',
    });

    expect(userRepository.getUsers()).toHaveLength(1);
  });
});
