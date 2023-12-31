import { FastifyInstance } from 'fastify';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { throwError } from '../utils/throwError';

import { FastifyRequestProps } from '../types';

export const userRoutes = async (app: FastifyInstance) => {
  // Register user
  app.post('/register', async (req: FastifyRequestProps, res) => {
    try {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userAlreadyExists) {
        return throwError({
          res,
          message: 'User already exists. Try another username.',
        });
      }

      const createdUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      return res.send({
        message: 'User created successfully',
        user: {
          username: createdUser.username,
          id: createdUser.id,
        },
      });
    } catch (error) {
      return throwError({ res, message: error });
    }
  });

  // Login user
  app.post('/login', async (req: FastifyRequestProps, res) => {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) return throwError({ res, message: 'User not found' });

      const isPasswordValid = await bcrypt.compare(
        password,
        String(user?.password)
      );

      if (!isPasswordValid)
        return throwError({ res, message: 'Invalid password' });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: '7d',
        }
      );

      return res.send({
        message: 'Login token generated successfully.',
        token,
      });
    } catch (error) {
      return throwError({ res, message: error });
    }
  });
};
