import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { UpdateUserUseCase } from '../_users/update-user';
import { ResourceNotFoundError } from '../../../exceptions/resource-not-found-error';

let userRepository: InMemoryUserRepository;
let useCase: UpdateUserUseCase;

describe('Deve ser possível atualizar um usuário', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new UpdateUserUseCase(userRepository);
  });

  it('deve atualizar um usuário existente', async () => {
    const newUser = {
      id: 'user-01',
      name: 'Jon Doe',
      email: 'jon@example.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.users.push(newUser);

    const updatedUser = await useCase.execute({
      id: newUser.id,
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '654321',
    });

    expect(updatedUser).toEqual({
      id: newUser.id,
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '654321',
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  });

  it('deve atualizar parcialmente um usuário existente', async () => {
    const newUser = {
      id: 'user-01',
      name: 'Jon Doe',
      email: 'jon@example.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.users.push(newUser);

    const updatedUser = await useCase.execute({
      id: newUser.id,
      email: 'jane@example.com',
    });

    expect(updatedUser).toEqual({
      id: newUser.id,
      name: 'Jon Doe',
      email: 'jane@example.com',
      password: '123456',
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  });

  it('deve lançar um erro se o usuário não for encontrado', async () => {
    await expect(() =>
      useCase.execute({
        id: 'non-existing-id',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
