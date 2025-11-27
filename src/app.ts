import fastify from 'fastify';
import { prisma } from './lib/prisma';

export const app = fastify();

app.get('/', async (req, res) => {
  const user = await prisma.user.findFirst();

  return res.send({ user });
});
