import { FastifyInstance } from 'fastify';
import { NoteController } from '../controllers/NoteController';

export async function noteRoutes(fastify: FastifyInstance) {
  fastify.post('/api/notes', NoteController.create);
  fastify.get('/api/notes/:id', NoteController.get);
}
