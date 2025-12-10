import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeUpdateUserFactory } from '../../../use-cases/factories/users/update-user-factory';
import { ResourceNotFoundError } from '../../../../exceptions/resource-not-found-error';

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
  });

  const data = userSchema.parse(request.body);

  const { sub } = request.user as { sub: string };
  try {
    const updateUser = makeUpdateUserFactory();
    await updateUser.execute({ id: sub, ...data });
    reply.status(200).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.status(500).send({ message: 'Internal server error', err: error });
  }
}
