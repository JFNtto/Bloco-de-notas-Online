"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const CreateNoteUseCase_1 = require("../../../../application/useCases/CreateNoteUseCase");
const GetNoteUseCase_1 = require("../../../../application/useCases/GetNoteUseCase");
const PrismaNoteRepository_1 = require("../../../database/prisma/PrismaNoteRepository");
const noteRepository = new PrismaNoteRepository_1.PrismaNoteRepository();
const createNoteUseCase = new CreateNoteUseCase_1.CreateNoteUseCase(noteRepository);
const getNoteUseCase = new GetNoteUseCase_1.GetNoteUseCase(noteRepository);
class NoteController {
    static async create(request, reply) {
        try {
            const { content, expirationHours } = request.body;
            if (!content || !expirationHours) {
                return reply.status(400).send({ error: 'Content and expirationHours are required.' });
            }
            const note = await createNoteUseCase.execute(content, Number(expirationHours));
            return reply.status(201).send(note);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    static async get(request, reply) {
        try {
            const { id } = request.params;
            const note = await getNoteUseCase.execute(id);
            if (!note) {
                return reply.status(404).send({ error: 'Note not found or expired.' });
            }
            return reply.status(200).send(note);
        }
        catch (error) {
            return reply.status(500).send({ error: 'Internal server error' });
        }
    }
}
exports.NoteController = NoteController;
