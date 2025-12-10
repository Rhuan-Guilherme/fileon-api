import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeAuthenticateUserFactory } from '@/app/use-cases/factories/users/authenticate-user';
import { InvalidCredentialsError } from '@/exceptions/invalid-credentials-error';
import { env } from '@/env';

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  try {
    const authenticate = makeAuthenticateUserFactory();
    const user = await authenticate.execute({ email, password });

    const accessToken = await reply.jwtSign(
      { sub: user.id },
      { expiresIn: '1h' }
    );

    reply.setCookie('accessToken', accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production' ? true : false,
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });

    return reply.status(200).send({ ...user, password: undefined });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: 'Invalid credentials' });
    }

    return reply
      .status(500)
      .send({ message: 'Internal server error', err: error });
  }
}
