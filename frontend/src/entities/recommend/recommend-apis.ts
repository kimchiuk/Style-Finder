import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';
import { SearchFilter } from './recommend-types';

const url = '/api/recommend';
const api = {
    getRecommends: (filter: SearchFilter) => jwtAxiosInstance.post(`${url}`, filter),
    getStyleRecommend: () => jwtAxiosInstance.get(`${url}/style`),
    getCategoryRecommend: () => jwtAxiosInstance.get(`${url}/category`),
    getColorRecommend: () => jwtAxiosInstance.get(`${url}/color`),
};

export default api;
