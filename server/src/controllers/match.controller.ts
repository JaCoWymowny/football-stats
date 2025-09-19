import { Request, Response } from 'express';
import apiClient from '../config/axios.config';
import { fetchMatches, getMatchesDateRange } from '../services/matches';

export async function httpGetMatches(_req: Request, res: Response): Promise<void> {
  try {
    const matches = await fetchMatches(getMatchesDateRange());
    res.status(200).json({ matches });
  } catch (e) {
    console.error('Błąd podczas pobierania meczów:', e);
    res.status(500).json({ message: 'Nie udało się pobrać danych z API.' });
  }
}

export async function httpGetMatchById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'ID meczu jest wymagane.' });
      return;
    }

    const response = await apiClient.get(`/matches/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Błąd podczas pobierania szczegółów meczu:', error);
    res.status(500).json({ message: 'Nie udało się pobrać danych z API.' });
  }
}
