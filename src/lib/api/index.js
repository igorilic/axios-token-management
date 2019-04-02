import axios from 'axios';
import requestInt from './interceptors/request';
import responseInt from './interceptors/response';

function api(config) {
  const secureApi = axios.create(config);
  const authApi = axios.create(config);
  secureApi.interceptors.request.use(requestInt);
  secureApi.interceptors.response.use(responseInt);
  authApi.interceptors.response.use(responseInt);
  const get = url => secureApi.get(url);
  const post = (url, data) => authApi.post(url, data);
  return {
    get,
    post,
  };
}

export default api;
