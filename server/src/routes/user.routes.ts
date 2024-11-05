import express from 'express';
import {
  httpRegisterUser,
  httpLoginUser,
  httpGetUserById,
  httpGetAllUsers,
  httpGetCurrentUser,
  httpUpdateCurrentUser,
} from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const userRouter = express.Router();

userRouter.post('/register', httpRegisterUser);
userRouter.post('/login', httpLoginUser);

userRouter.get('/me', authenticateJWT, httpGetCurrentUser);
userRouter.patch('/me', authenticateJWT, httpUpdateCurrentUser);
userRouter.get('/:id', authenticateJWT, httpGetUserById);
userRouter.get('/', authenticateJWT, httpGetAllUsers);

export default userRouter;
