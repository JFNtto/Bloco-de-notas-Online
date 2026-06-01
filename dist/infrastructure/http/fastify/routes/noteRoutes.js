"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoutes = noteRoutes;
const NoteController_1 = require("../controllers/NoteController");
async function noteRoutes(fastify) {
    fastify.post('/api/notes', NoteController_1.NoteController.create);
    fastify.get('/api/notes/:id', NoteController_1.NoteController.get);
}
