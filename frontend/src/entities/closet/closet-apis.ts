import axiosInstance from '../../shared/utils/axiosInstance';

const url = '/api/closet';
const api = {
  uploadCloth: (clothPart: string, clothImage: File[]) => axiosInstance.post(`${url}/uploadCloset`, { clothPart, clothImage }),
  getClosets: () => axiosInstance.post(`${url}/getAll`),
  feedLikes: (closetId: number) => axiosInstance.post(`${url}/delete/${closetId}`, closetId),
};

export default api;
