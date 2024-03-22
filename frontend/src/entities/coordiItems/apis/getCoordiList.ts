import axiosInstance from '../../../shared/utils/axiosInstance';

const api = {
  getCoordiList: (info: string) => axiosInstance.post(`/signin`, info),
};

export default api;
