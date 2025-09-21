import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const apiClient = setupCache(
  axios.create({
    baseURL: 'https://api.football-data.org/v4',
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_API_KEY || '',
    },
  }),
  {
    ttl: 60 * 1000 * 5,
  }
);

export default apiClient;
