import express from 'express';
import { httpGetMatchById, httpGetMatches } from '../controllers/match.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { rateLimiter } from '../middlewares/rateLimit.middleware';

const matchRouter = express.Router();

matchRouter.get('/', authenticateJWT, rateLimiter, httpGetMatches);
matchRouter.get('/:id', authenticateJWT, rateLimiter, httpGetMatchById);

export default matchRouter;
