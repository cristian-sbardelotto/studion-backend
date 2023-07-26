import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

import { throwError } from '../utils/throwError';

import { FastifyRequestProps } from '../types';

export const eventsRoutes = async (app: FastifyInstance) => {
  // Get all events
  app.get('/', async (req, res) => {
    try {
      const events = await prisma.event.findMany({});

      if (events.length) return JSON.stringify({ events });

      return JSON.stringify({
        message: 'You do not have any events registered',
      });
    } catch (error) {
      return throwError({ res, message: error });
    }
  });

  // Get an event by id
  app.get('/events/:id', async (req: FastifyRequestProps, res) => {
    try {
      const { id } = req.params;

      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (event) return JSON.stringify({ event });

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
      const { name, date, location, maxParticipants, description } = req.body;

      if (!name || !location || !maxParticipants) {
        return throwError({
          res,
          message:
            'You must inform the properties name, location and maxParticipants',
        });
      }

      const createdEvent = await prisma.event.create({
        data: {
          name,
          date,
          location,
          maxParticipants,
          description,
        },
      });

      return JSON.stringify(createdEvent);
    } catch (error) {
      return throwError({ res, message: error });
    }
  });

  // Update event by id
  app.put('/events/:id', async (req: FastifyRequestProps, res) => {
    try {
      const { id } = req.params;
      const { name, date, description, location, maxParticipants } = req.body;

      const updatedEvent = await prisma.event.update({
        data: {
          name,
          date,
          description,
          location,
          maxParticipants,
        },
        where: { id },
      });

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

      return JSON.stringify({ event });
    } catch (error) {
      return throwError({ res, message: error });
    }
  });
};
