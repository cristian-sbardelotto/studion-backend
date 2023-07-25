import { FastifyRequest } from 'fastify';

import { Event } from '@prisma/client';

export type FastifyRequestBodyProps = FastifyRequest<{
  Body: Event;
  Params: {
    id: string;
  };
}>;
