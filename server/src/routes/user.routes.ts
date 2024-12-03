import express from 'express';
import {
  httpRegisterUser,
  httpLoginUser,
  httpGetUserById,
  httpGetAllUsers,
  httpGetCurrentUser,
  httpUpdateUserEmail,
  httpUpdateUserPassword,
  httpRefreshToken,
} from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { rateLimiter } from '../middlewares/rateLimit.middleware';

const userRouter = express.Router();

userRouter.post('/register', httpRegisterUser);
userRouter.post('/login', rateLimiter, httpLoginUser);
userRouter.post('/refresh-token', rateLimiter, httpRefreshToken);

userRouter.get('/me', authenticateJWT, httpGetCurrentUser);
userRouter.patch('/me/change-email', authenticateJWT, httpUpdateUserEmail);
userRouter.patch('/me/change-password', authenticateJWT, httpUpdateUserPassword);
userRouter.get('/:id', authenticateJWT, httpGetUserById);
userRouter.get('/', authenticateJWT, httpGetAllUsers);

export default userRouter;
