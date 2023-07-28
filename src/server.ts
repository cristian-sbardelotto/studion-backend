import cors from '@fastify/cors';
import fastify from 'fastify';
import { eventsRoutes } from './routes/events';
import { userRoutes } from './routes/user';

const app = fastify({ logger: true });
const port = 5432;

app.register(cors, {
  origin: true,
});

app.register(eventsRoutes);
app.register(userRoutes);

app.listen({ port }, async () => {
  console.log(`🚀 listening on http://localhost:${port}`);
});
