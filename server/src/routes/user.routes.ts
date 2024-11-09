import express from 'express';
import {
  httpRegisterUser,
  httpLoginUser,
  httpGetUserById,
  httpGetAllUsers,
  httpGetCurrentUser,
  httpUpdateUserEmail,
  httpUpdateUserPassword,
} from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const userRouter = express.Router();

userRouter.post('/register', httpRegisterUser);
userRouter.post('/login', httpLoginUser);

userRouter.get('/me', authenticateJWT, httpGetCurrentUser);
userRouter.patch('/me/change-email', authenticateJWT, httpUpdateUserEmail); // Zmiana emaila
userRouter.patch('/me/change-password', authenticateJWT, httpUpdateUserPassword); // Zmiana hasła
userRouter.get('/:id', authenticateJWT, httpGetUserById);
userRouter.get('/', authenticateJWT, httpGetAllUsers);

export default userRouter;
