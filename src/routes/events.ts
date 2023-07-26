import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

import { FastifyRequestProps } from '../types';

export const eventsRoutes = async (app: FastifyInstance) => {
  const throwError = (
    res: { statusCode: number },
    message: string | unknown
  ) => {
    res.statusCode = 400;
    return JSON.stringify({
      error: {
        status: res.statusCode,
        message,
      },
    });
  };

  // Get all events
  app.get('/', async (req, res) => {
    try {
      const events = await prisma.event.findMany({});

      if (events.length) {
        return JSON.stringify({ events });
      }

      return throwError(res, 'You do not have any events registered');
    } catch (error) {
      throwError(res, error);
    }
  });

  // Get an event by id
  app.get('/events/:id', async (req: FastifyRequestProps, res) => {
    try {
      const { id } = req.params;

      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (event) {
        return JSON.stringify({ event });
      }

      res.statusCode = 400;
      return JSON.stringify({
        error: {
          status: res.statusCode,
          message: 'Invalid event id',
        },
      });
    } catch (error) {
      return throwError(res, error);
    }
  });

  // Create a new event
  app.post('/events', async (req: FastifyRequestProps, res) => {
    try {
      const { name, date } = req.body;

      if (!name) {
        res.statusCode = 400;
        return JSON.stringify({
          error: {
            status: res.statusCode,
            message: 'You must inform the name property',
          },
        });
      }

      const createdEvent = await prisma.event.create({
        data: {
          name,
          date,
        },
      });

      if (createdEvent) {
        return JSON.stringify(createdEvent);
      }

      res.statusCode = 400;
      return JSON.stringify({
        error: {
          status: res.statusCode,
          message: 'Something went wrong with the event creation',
        },
      });
    } catch (error) {
      return throwError(res, error);
    }
  });

  // Update event by id
  app.put('/events/:id', async (req: FastifyRequestProps, res) => {
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

      if (!updatedEvent) {
        console.log('asjdadsoijas');
      }

      return JSON.stringify(updatedEvent);
    } catch (error) {
      return throwError(res, error);
    }
  });

  // Delete event by id
  app.delete('/events/:id', async (req: FastifyRequestProps, res) => {
    try {
      const { id } = req.params;

      const event = await prisma.event.delete({
        where: { id },
      });

      if (event) {
        return JSON.stringify({ event });
      }

      res.statusCode = 400;
      return JSON.stringify({
        error: {
          status: res.statusCode,
          message: 'Something went wrong with the event exclusion',
        },
      });
    } catch (error) {
      return throwError(res, error);
    }
  });
};
