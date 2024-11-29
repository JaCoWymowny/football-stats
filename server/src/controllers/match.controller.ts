import { Request, Response } from 'express';
import apiClient from '../config/axios.config';

export async function httpGetMatches(req: Request, res: Response): Promise<void> {
  try {
    const response = await apiClient.get('/matches', {
      baseURL: 'https://api.football-data.org/v4',
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY || '',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Błąd podczas pobierania meczów:', error);
    res.status(500).json({ message: 'Nie udało się pobrać danych z API.' });
  }
}
