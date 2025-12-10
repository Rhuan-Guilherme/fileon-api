import type { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const payload = await request.jwtVerify({ onlyCookie: true });
    request.user = payload;
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized', error });
  }
}
