import { ThrowErrorProps } from '../types';

export const throwError = ({ res, message }: ThrowErrorProps) => {
  res.statusCode = 400;
  return JSON.stringify({
    error: {
      status: res.statusCode,
      message,
    },
  });
};
