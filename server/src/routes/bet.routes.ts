import express from 'express';
import { httpPlaceBet, httpGetUserBets } from '../controllers/bet.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const betRouter = express.Router();

betRouter.get('/', authenticateJWT, httpGetUserBets);
betRouter.post('/', authenticateJWT, httpPlaceBet);

export default betRouter;
