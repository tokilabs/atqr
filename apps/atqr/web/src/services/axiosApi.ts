declare const axios: typeof import('axios').default;

const axiosApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts/',
});

export default axiosApi;
