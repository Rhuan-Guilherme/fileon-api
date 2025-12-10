import type { FastifyInstance } from 'fastify';
import { createUserController } from './create-user-controller';
import { updateUserController } from './update-user-controller';
import { authenticateUserController } from './authenticate-user-controller';
import { authMiddleware } from '../../middleware/auth-middleware';

export async function userRoutes(app: FastifyInstance) {
  app.post('/user/register', createUserController);
  app.patch(
    '/user/update',
    { preHandler: authMiddleware },
    updateUserController
  );
  app.post('/user/authenticate', authenticateUserController);
}
