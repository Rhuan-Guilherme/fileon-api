import fastify from 'fastify';
import { userRoutes } from './app/http/controller/user/router';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { env } from './env';

export const app = fastify();

// Register plugins
app.register(fastifyCookie, {
  secret: env.COOKIE_SECRET,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'accessToken',
    signed: false,
  },
});

// Register routes
app.register(userRoutes);
