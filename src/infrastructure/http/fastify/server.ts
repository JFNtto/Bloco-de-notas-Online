import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import path from 'path';
import { noteRoutes } from './routes/noteRoutes';

const fastify = Fastify({ logger: true });

// Register CORS
fastify.register(fastifyCors, { origin: '*' });

// Register Static Files for Frontend
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../../../../public'),
  prefix: '/', 
});

// Register API Routes
fastify.register(noteRoutes);

// Fallback to index.html for unknown routes (SPA like behavior)
fastify.setNotFoundHandler((req, reply) => {
  if (req.url.startsWith('/api')) {
    reply.status(404).send({ error: 'API route not found' });
  } else {
    reply.sendFile('index.html');
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
