import fastify from 'fastify';
import { prisma } from './lib/prisma';
import { userRoutes } from './app/http/controller/user/router';

export const app = fastify();

app.register(userRoutes);

app.get('/', async (req, res) => {
  const user = await prisma.user.findFirst();

  return res.send({ user });
});
