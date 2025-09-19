import apiClient from '../config/axios.config';

export function getMatchesDateRange() {
  const from = new Date();
  const to = new Date();
  to.setDate(from.getDate() + 6);
  return {
    dateFrom: from.toISOString().split('T')[0],
    dateTo: to.toISOString().split('T')[0],
  };
}

export async function fetchMatches(range = getMatchesDateRange()): Promise<API.Match[]> {
  const { data } = await apiClient.get('/matches', { params: range });
  return data.matches ?? [];
}
