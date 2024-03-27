import axiosInstance from '../../shared/utils/axiosInstance';
import { SignInRequestDTO, SignUpRequestDTO, TokenReissueRequestDTO, UpdateUserInfoRequestDTO } from './user-types';

const url = '/api/user';
const api = {
  signUp: (request: SignUpRequestDTO, profileImage: File[]) => axiosInstance.post(`${url}/signUp`, { request, profileImage }),
  signIn: (request: SignInRequestDTO) => axiosInstance.post(`${url}/signIn`, request),

  tokenReissue: (request: TokenReissueRequestDTO) => axiosInstance.post(`${url}/token`, request),
  updateUserInfo: (request: UpdateUserInfoRequestDTO, profileImage: File[]) => axiosInstance.put(`${url}/update`, { request, profileImage }),
  removeUserInfo: () => axiosInstance.delete(`${url}/remove`),
};

export default api;
