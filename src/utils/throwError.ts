import { ThrowErrorProps } from '../types';

export const throwError = ({ res, message }: ThrowErrorProps) =>
  res.status(400).send({ message });
