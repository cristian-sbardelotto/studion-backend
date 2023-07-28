import { verify } from 'jsonwebtoken';
import { ResponseProps } from '../types';
import { throwError } from './throwError';

export const checkIsUserAuthenticated = (token: string, res: ResponseProps) => {
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
