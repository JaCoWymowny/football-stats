import express from 'express';
import userRouter from './user.routes';

const api = express.Router();

api.use('/users', userRouter);

export default api;
