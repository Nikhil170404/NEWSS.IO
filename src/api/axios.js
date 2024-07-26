import axios from 'axios';

const API_KEYS = [
  'cba9f5744bd141c1a8ee18e94adf6b84', // Replace with your actual primary API key
  '68c528de0b5a4b32a54340505b102236',
  '24d4c27b0216444eb167938b8aad71f5',
  '4a202b93377b4af3b130b37cc5c4c8b8',
  '8018484aac554ecfa4a883422b34f15f'
];

const api = axios.create({
  baseURL: 'https://news-io.onrender.com', // Your backend server URL
});

api.interceptors.response.use(
  response => response,
  async error => {
    const { config } = error;

    if (error.response && error.response.status === 500) {
      const retryApi = axios.create({
        baseURL: 'https://news-io.onrender.com',
        headers: { 'Authorization': API_KEYS.shift() }, // Use the next API key
      });

      try {
        const response = await retryApi.request(config);
        return response;
      } catch (retryError) {
        // Move to the next API key
        API_KEYS.push(config.headers['Authorization']); // Requeue the key if still available
        return Promise.reject(retryError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
