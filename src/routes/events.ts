import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

import { throwError } from '../functions/throwError';

import { FastifyRequestProps } from '../types';

export const eventsRoutes = async (app: FastifyInstance) => {
  // Get all events
  app.get('/', async (req, res) => {
    try {
      const events = await prisma.event.findMany({});

      if (events.length) {
        return JSON.stringify({ events });
      }

      return throwError({
        res,
        message: 'You do not have any events registered',
      });
    } catch (error) {
      throwError({ res, message: error });
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

      return throwError({
        res,
        message: 'Invalid event id',
      });
    } catch (error) {
      return throwError({ res, message: error });
    }
  });

  // Create a new event
  app.post('/events', async (req: FastifyRequestProps, res) => {
    try {
      const { name, date } = req.body;

      if (!name) {
        return throwError({
          res,
          message: 'You must inform the name property',
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

      return throwError({
        res,
        message: 'Something went wrong with the event creation',
      });
    } catch (error) {
      return throwError({ res, message: error });
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
      return throwError({ res, message: error });
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

      throwError({
        res,
        message: 'Something went wrong with the event exclusion',
      });
    } catch (error) {
      return throwError({ res, message: error });
    }
  });
};
