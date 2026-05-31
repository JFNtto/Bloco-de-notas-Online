import { INoteRepository } from '../../domain/repositories/INoteRepository';
import { Note } from '../../domain/entities/Note';

export class GetNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(id: string): Promise<Note | null> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      return null;
    }

    const now = new Date();
    if (now > note.expiresAt) {
      // Lazy deletion: if expired, delete it and return null
      await this.noteRepository.delete(id);
      return null;
    }

    return note;
  }
}
