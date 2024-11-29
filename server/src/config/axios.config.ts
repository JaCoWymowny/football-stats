import { setupCache } from 'axios-cache-interceptor';
import axios from 'axios';

const apiClient = setupCache(axios.create(), {
  ttl: 60 * 1000, //60 sec
});

export default apiClient;
