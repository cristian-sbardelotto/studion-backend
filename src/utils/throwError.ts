import { ThrowErrorProps } from '../types';

export const throwError = ({ res, message }: ThrowErrorProps) => {
  return res.status(400).send({ message });
};
