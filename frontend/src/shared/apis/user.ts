// import axios from 'axios';
// import qs from 'qs';

// const axiosInstance = axios.create({
//   baseURL: process.env.API_BASE_URL,
//   timeout: 60000,
//   headers: { accept: '*/*' },
//   withCredentials: true,
// });

// axiosInstance.defaults.paramsSerializer = (params) => {
//   return qs.stringify(params);
// };

// // API 를 작성해서, 원하는 곳에 import 해 사용한다.
// // 다른 API 도 재사용 가능하다.
// const api = {
//   signin: (info: LoginInfo) => axiosInstance.post(`/signin`, info),
//   signup: (info: User) => axiosInstance.post(`/signup`, info),

//   getTest1: () => axiosInstance.get(''),
//   getTest2: (id: string) => axiosInstance.get(id),
// };

// export default axiosInstance;
