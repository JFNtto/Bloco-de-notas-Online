"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaNoteRepository = void 0;
const PrismaClient_1 = require("./PrismaClient");
class PrismaNoteRepository {
    async save(note) {
        await PrismaClient_1.prisma.note.create({
            data: {
                id: note.id,
                content: note.content,
                createdAt: note.createdAt,
                expiresAt: note.expiresAt,
            },
        });
    }
    async findById(id) {
        const note = await PrismaClient_1.prisma.note.findUnique({
            where: { id },
        });
        if (!note)
            return null;
        return {
            id: note.id,
            content: note.content,
            createdAt: note.createdAt,
            expiresAt: note.expiresAt,
        };
    }
    async delete(id) {
        await PrismaClient_1.prisma.note.delete({
            where: { id },
        });
    }
}
exports.PrismaNoteRepository = PrismaNoteRepository;
