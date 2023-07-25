import { FastifyRequest } from 'fastify';

import { Event } from '@prisma/client';

export type FastifyRequestProps = FastifyRequest<{
  Body: Event;
  Params: {
    id: string;
  };
}>;
