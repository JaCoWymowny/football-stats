import express from 'express';
import { httpRegisterUser, httpLoginUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/register', httpRegisterUser);
userRouter.post('/login', httpLoginUser);

export default userRouter;
