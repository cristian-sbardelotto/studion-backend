import { verify } from 'jsonwebtoken';

import { throwError } from './throwError';

import { ResponseProps } from '../types';

export const checkIsUserAuthenticated = (token: string, res: ResponseProps) => {
  if (token === undefined) {
    return throwError({
      res,
      message: 'You must be authenticated to access this route.',
    });
  }

  try {
    const authToken = token.replace('Bearer ', '');
    const isValidToken = verify(authToken, process.env.JWT_SECRET_KEY!);

    return isValidToken ? true : false;
  } catch (error) {
    return throwError({
      res,
      message: error,
    });
  }
};
