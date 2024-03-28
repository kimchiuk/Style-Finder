import axiosInstance from '../../shared/utils/axiosInstance';
import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';
import { SignInRequestDTO, SignUpRequestDTO, TokenReissueRequestDTO, UpdateUserInfoRequestDTO } from './user-types';

const url = '/api/user';
const api = {
  signUp: (request: SignUpRequestDTO) => {
    const headers = { "Content-Type": "multipart/form-data" }
    return axiosInstance.post(`${url}/signUp`, request, { headers })
  },
  signIn: (request: SignInRequestDTO) => axiosInstance.post(`${url}/signIn`, request),

  tokenReissue: (request: TokenReissueRequestDTO) => axiosInstance.post(`${url}/token`, request),
  updateUserInfo: (request: UpdateUserInfoRequestDTO, profileImage: File[]) => jwtAxiosInstance.put(`${url}/update`, { request, profileImage }),
  removeUserInfo: () => jwtAxiosInstance.delete(`${url}/remove`),
};

export default api;
