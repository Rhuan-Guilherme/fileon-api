import type { FastifyInstance } from 'fastify';
import { createUserController } from './create-user-controller';

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', createUserController);
}
