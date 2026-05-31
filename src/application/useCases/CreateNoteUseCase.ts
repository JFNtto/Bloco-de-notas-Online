import { INoteRepository } from '../../domain/repositories/INoteRepository';
import { Note } from '../../domain/entities/Note';
import * as crypto from 'crypto';

export class CreateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(content: string, expirationHours: number): Promise<Note> {
    if (![1, 5, 24].includes(expirationHours)) {
      throw new Error('Invalid expiration time. Must be 1, 5, or 24 hours.');
    }

    const id = crypto.randomBytes(4).toString('hex'); // Gera um ID curto (8 chars)
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + expirationHours * 60 * 60 * 1000);

    const note: Note = {
      id,
      content,
      createdAt,
      expiresAt,
    };

    await this.noteRepository.save(note);

    return note;
  }
}
