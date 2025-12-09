import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { CreateUserUseCase } from '../users/create-user';
import { UserAlreadyExistsError } from '../../../exceptions/user-already-exists-error';
import type { User } from '../../../generated/prisma/client';
import { compare } from 'bcryptjs';

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

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toMatchObject({
      email: 'teste@teste.com',
      name: 'Teste',
    });
  });

  it('deve lançar um erro ao tentar criar um usuário com email já existente', async () => {
    const newUser = {
      id: 'user-01',
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.users.push(newUser);

    await expect(
      async () =>
        await useCase.execute({
          email: 'teste@teste.com',
          name: 'Teste',
          password: '123456',
        })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('deve hash a senha do usuário ao criar um novo usuário', async () => {
    await useCase.execute({
      email: 'teste@teste.com',
      name: 'Teste',
      password: '123456',
    });

    const createdUser = userRepository.users[0] as User;

    const isPasswordCorrect = await compare('123456', createdUser.password);

    expect(isPasswordCorrect).toBe(true);
  });
});
