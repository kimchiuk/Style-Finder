import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';

const url = '/api/user';
const api = {
  analysisFavor: () => jwtAxiosInstance.get(`${url}/favor`)
};

export default api;
