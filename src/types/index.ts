import { FastifyRequest } from 'fastify';

import { Event } from '@prisma/client';

export type FastifyRequestProps = FastifyRequest<{
  Body: Event;
  Params: {
    id: string;
  };
}>;

export type ThrowErrorProps = {
  res: {
    statusCode: number;
  };
  message: string | unknown;
};
