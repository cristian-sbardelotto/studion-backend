import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

import { throwError } from '../utils/throwError';

import { FastifyRequestProps } from '../types';

export const eventsRoutes = async (app: FastifyInstance) => {
  // Get all events
  app.get('/', async (req, res) => {
    try {
      const events = await prisma.event.findMany({});

      if (events.length) return res.send({ events });

      return res.send({
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

      if (event) return res.send({ event });

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

      const repeatedName = await prisma.event.findFirst({
        where: {
          name,
        },
      });

      if (repeatedName) {
        return throwError({
          res,
          message: 'An event with that name already exists',
        });
      }

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

      return res.send(createdEvent);
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

      return res.send(updatedEvent);
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

      return res.send({ event });
    } catch (error) {
      return throwError({ res, message: error });
    }
  });
};
