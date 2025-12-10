import type { FastifyInstance } from 'fastify';
import { createUserController } from './create-user-controller';
import { updateUserController } from './update-user-controller';

export async function userRoutes(app: FastifyInstance) {
  app.post('/user/register', createUserController);
  app.patch('/user/update', updateUserController);
}
