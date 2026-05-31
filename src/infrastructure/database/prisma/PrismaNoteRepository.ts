import { INoteRepository } from '../../../domain/repositories/INoteRepository';
import { Note } from '../../../domain/entities/Note';
import { prisma } from './PrismaClient';

export class PrismaNoteRepository implements INoteRepository {
  async save(note: Note): Promise<void> {
    await prisma.note.create({
      data: {
        id: note.id,
        content: note.content,
        createdAt: note.createdAt,
        expiresAt: note.expiresAt,
      },
    });
  }

  async findById(id: string): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: { id },
    });
    
    if (!note) return null;
    
    return {
      id: note.id,
      content: note.content,
      createdAt: note.createdAt,
      expiresAt: note.expiresAt,
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.note.delete({
      where: { id },
    });
  }
}
