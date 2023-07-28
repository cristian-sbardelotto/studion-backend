import { FastifyRequest } from 'fastify';

import { Event, User } from '@prisma/client';

export type FastifyRequestProps = FastifyRequest<{
  Body: Event & User;
  Params: {
    id: string;
  };
}>;

export type ThrowErrorProps = {
  res: {
    status: (number: number) => {
      send: (message: object) => void;
    };
  };
  message: string | unknown;
};
