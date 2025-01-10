import { Request, Response } from 'express';
import apiClient from '../config/axios.config';

export async function httpGetMatches(req: Request, res: Response): Promise<void> {
  try {
    const today = new Date();
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(today.getDate() + 6);

    const dateFrom = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const dateTo = fiveDaysLater.toISOString().split('T')[0]; // YYYY-MM-DD

    const response = await apiClient.get('/matches', {
      params: {
        dateFrom,
        dateTo,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Błąd podczas pobierania meczów:', error);
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
