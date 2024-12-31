import express from 'express';
import {
  httpPlaceBet,
  httpGetUserBets,
  updateBetResults,
  getBetRanking,
} from '../controllers/bet.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const betRouter = express.Router();

betRouter.get('/user-bets/:id', authenticateJWT, httpGetUserBets);
betRouter.get('/ranking', authenticateJWT, getBetRanking);
betRouter.post('/', authenticateJWT, httpPlaceBet);
betRouter.post('/update-results', authenticateJWT, async (req, res) => {
  try {
    await updateBetResults();
    res.status(200).json({ message: 'Wyniki zakładów zostały zaktualizowane.' });
  } catch (error) {
    console.error('Błąd podczas ręcznego wywołania aktualizacji zakładów:');
    res.status(500).json({ message: 'Wystąpił błąd podczas aktualizacji zakładów.' });
  }
});

export default betRouter;
