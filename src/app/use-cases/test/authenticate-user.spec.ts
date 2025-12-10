import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../repositories/in-memory/user-memory-repository';
import { AuthenticateUserUseCase } from '../_users/authenticate-user';
import { hash } from 'bcryptjs';

let userRepository: InMemoryUserRepository;
let useCase: AuthenticateUserUseCase;

describe('Caso para validar credenciais de um usuário', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new AuthenticateUserUseCase(userRepository);
  });

  it('deve autenticar um usuário com credenciais válidas', async () => {
    const newUser = {
      id: 'user-01',
      name: 'Teste',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.users.push(newUser);

    const user = await useCase.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toMatchObject({
      email: 'teste@teste.com',
      name: 'Teste',
    });
  });
});
