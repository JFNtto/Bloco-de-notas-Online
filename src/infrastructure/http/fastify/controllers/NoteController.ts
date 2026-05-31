import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateNoteUseCase } from '../../../../application/useCases/CreateNoteUseCase';
import { GetNoteUseCase } from '../../../../application/useCases/GetNoteUseCase';
import { PrismaNoteRepository } from '../../../database/prisma/PrismaNoteRepository';

const noteRepository = new PrismaNoteRepository();
const createNoteUseCase = new CreateNoteUseCase(noteRepository);
const getNoteUseCase = new GetNoteUseCase(noteRepository);

export class NoteController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { content, expirationHours } = request.body as { content: string; expirationHours: number };
      
      if (!content || !expirationHours) {
        return reply.status(400).send({ error: 'Content and expirationHours are required.' });
      }

      const note = await createNoteUseCase.execute(content, Number(expirationHours));
      return reply.status(201).send(note);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  static async get(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const note = await getNoteUseCase.execute(id);

      if (!note) {
        return reply.status(404).send({ error: 'Note not found or expired.' });
      }

      return reply.status(200).send(note);
    } catch (error: any) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  }
}
