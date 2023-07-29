import { FastifyRequest } from 'fastify';

import { Event, User } from '@prisma/client';

export type FastifyRequestProps = FastifyRequest<{
  Body: Event & User;
  Params: {
    id: string;
  };
}>;

export type ResponseProps = {
  status: (number: number) => {
    send: (message: object) => void;
  };
};

export type ThrowErrorProps = {
  res: ResponseProps;
  message: string | unknown;
};
