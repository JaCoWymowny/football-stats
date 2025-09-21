import { Request, Response } from 'express';
import apiClient from '../config/axios.config';
import { fetchMatches, getMatchesDateRange } from '../services/matches';

export async function httpGetMatches(_req: Request, res: Response): Promise<void> {
  try {
    const matches = await fetchMatches(getMatchesDateRange());
    res.status(200).json({ matches });
  } catch (e) {
    console.error('Error while downloading matches:', e);
    res.status(500).json({ message: 'Failed to retrieve data from API.' });
  }
}

export async function httpGetMatchById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Match ID is required.' });
      return;
    }

    const response = await apiClient.get(`/matches/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error getting match details:', error);
    res.status(500).json({ message: 'Failed to retrieve data from API.' });
  }
}
