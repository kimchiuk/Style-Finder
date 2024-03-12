import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 60000,
  headers: { accept: '*/*' },
  withCredentials: true,
});

axiosInstance.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};

export default axiosInstance;
