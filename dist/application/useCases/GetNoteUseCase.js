"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNoteUseCase = void 0;
class GetNoteUseCase {
    noteRepository;
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async execute(id) {
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
exports.GetNoteUseCase = GetNoteUseCase;
