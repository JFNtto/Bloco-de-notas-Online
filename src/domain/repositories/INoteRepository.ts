import { Note } from '../entities/Note';

export interface INoteRepository {
  save(note: Note): Promise<void>;
  findById(id: string): Promise<Note | null>;
  delete(id: string): Promise<void>;
}
