import cors from '@fastify/cors';
import fastify from 'fastify';

const app = fastify({ logger: true });
const port = 5432;

app.register(cors, {
  origin: true,
});

app.get('/', (req, res) => {
  res.send('oi');
});

app.listen({ port }, () => {
  console.log(`🚀 listening on http://localhost:${port}`);
});
