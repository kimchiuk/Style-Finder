import axiosInstance from '../../shared/utils/axiosInstance';
import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';
import { CoordiCreateRequestDTO } from './coordi-types';

const url = '/api/coordi';
const api = {
  coordiCreate: (request: CoordiCreateRequestDTO) => jwtAxiosInstance.post(`${url}`, request),
};

export default api;
