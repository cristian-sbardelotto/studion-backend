import cors from '@fastify/cors';
import fastify from 'fastify';
import { eventsRoutes } from './routes/events';

const app = fastify({ logger: true });
const port = 5432;

app.register(cors, {
  origin: true,
});

app.register(eventsRoutes);

app.listen({ port }, () => {
  console.log(`🚀 listening on http://localhost:${port}`);
});
