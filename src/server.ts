import cors from '@fastify/cors';
import fastify from 'fastify';
import { prisma } from './lib/prisma';

import { FastifyRequestProps } from './types';

const app = fastify({ logger: true });
const port = 5432;

app.register(cors, {
  origin: true,
});

// Get all events
app.get('/', async () => {
  try {
    const events = await prisma.event.findMany({});
    return JSON.stringify({ events });
  } catch (error) {
    console.error(`💣💣 ${error}`);
  }
});

// Get an event by id
app.get('/events/:id', async (req: FastifyRequestProps) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
    });

    return JSON.stringify({ event });
  } catch (error) {
    console.error(`💣💣 ${error}`);
  }
});

// Create a new event
app.post('/events', async (req: FastifyRequestProps) => {
  try {
    const { name, date } = req.body;

    const createdEvent = await prisma.event.create({
      data: {
        name,
        date,
      },
    });

    return JSON.stringify(createdEvent);
  } catch (error) {
    console.error(`💣💣 ${error}`);
  }
});

// Update event by id
app.put('/events/:id', async (req: FastifyRequestProps) => {
  try {
    const { id } = req.params;
    const { name, date } = req.body;

    const updatedEvent = await prisma.event.update({
      data: {
        name,
        date,
      },
      where: { id },
    });

    return JSON.stringify(updatedEvent);
  } catch (error) {
    console.error(`💣💣 ${error}`);
  }
});

// Delete event by id
app.delete('/events/:id', async (req: FastifyRequestProps) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.delete({
      where: { id },
    });

    return JSON.stringify({ event });
  } catch (error) {
    console.error(`💣💣 ${error}`);
  }
});

app.listen({ port }, () => {
  console.log(`🚀 listening on http://localhost:${port}`);
});
