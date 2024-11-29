import express from 'express';
import userRouter from './user.routes';
import matchRouter from './match-routes';

const api = express.Router();

api.use('/users', userRouter);
api.use('/matches', matchRouter);

export default api;
