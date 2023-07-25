import fastify from 'fastify';

const app = fastify({
  logger: true,
});

const port = 5432;

app.listen({ port }, () => {
  console.log(`🚀 listening on port ${port}`);
});
