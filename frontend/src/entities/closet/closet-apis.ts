import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';

const url = '/api/closet';
const api = {
  uploadCloth: (clothPart: string, clothImage: File) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return jwtAxiosInstance.post(`${url}/uploadCloset`, { clothPart, clothImage }, { headers });
  },
  getClosets: (clothPart: string) => jwtAxiosInstance.get(`${url}/getAll?part=${clothPart}`),
  deleteCloth: (closetId: number) => jwtAxiosInstance.post(`${url}/delete/${closetId}`, closetId),
};

export default api;
