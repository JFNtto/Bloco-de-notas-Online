"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const cors_1 = __importDefault(require("@fastify/cors"));
const path_1 = __importDefault(require("path"));
const noteRoutes_1 = require("./routes/noteRoutes");
const fastify = (0, fastify_1.default)({ logger: true });
// Register CORS
fastify.register(cors_1.default, { origin: '*' });
// Register Static Files for Frontend
fastify.register(static_1.default, {
    root: path_1.default.join(__dirname, '../../../../public'),
    prefix: '/',
});
// Register API Routes
fastify.register(noteRoutes_1.noteRoutes);
// Fallback to index.html for unknown routes (SPA like behavior)
fastify.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith('/api')) {
        reply.status(404).send({ error: 'API route not found' });
    }
    else {
        reply.sendFile('index.html');
    }
});
const start = async () => {
    try {
        const port = process.env.PORT ? Number(process.env.PORT) : 3000;
        await fastify.listen({ port, host: '0.0.0.0' });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
