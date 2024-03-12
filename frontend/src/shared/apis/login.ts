import axiosInstance from '../utils/axiosInstance';

import { User } from '../types/user';
import { Login } from '../types/login';

const api = {
  signin: (info: Login) => axiosInstance.post(`/signin`, info),
  signup: (info: User) => axiosInstance.post(`/signup`, info),

  getTest1: () => axiosInstance.get(''),
  getTest2: (id: string) => axiosInstance.get(id),
};

export default api;
