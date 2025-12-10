import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeCreateUserFactory } from '../../../use-cases/factories/users/create-user';
import { UserAlreadyExistsError } from '../../../../exceptions/user-already-exists-error';

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = userSchema.parse(request.body);

  try {
    const createUser = makeCreateUserFactory();
    await createUser.execute({ name, email, password });
    reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: 'User already exists' });
    }
    reply.status(500).send({ message: 'Internal server error', err: error });
  }
}
