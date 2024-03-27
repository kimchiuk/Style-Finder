import axiosInstance from '../../shared/utils/axiosInstance';
import { CoordiCreateRequestDTO } from './coordi-types';

const url = '/api/coordi';
const api = {
  coordiCreate: (request: CoordiCreateRequestDTO) => axiosInstance.post(`${url}`, request),
};

export default api;
