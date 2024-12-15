import express from 'express';
import { httpGetMatches } from '../controllers/match.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { rateLimiter } from '../middlewares/rateLimit.middleware';

const matchRouter = express.Router();

matchRouter.get('/', authenticateJWT, rateLimiter, httpGetMatches);

export default matchRouter;
