import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';
import { FeedCreateRequestDTO } from '../feed/feed-types';
import { SearchFilter } from './recommend-types';

const url = '/api/recommend';
const api = {
    getRecommends: (filter: SearchFilter) => jwtAxiosInstance.post(`${url}`, filter),
    getStyleRecommend: () => jwtAxiosInstance.get(`${url}/style`),
    getCategoryRecommend: () => jwtAxiosInstance.get(`${url}/category`),
    getColorRecommend: () => jwtAxiosInstance.get(`${url}/color`),
    createFeedCoordi: (request: any) => jwtAxiosInstance.post(`${url}/create`, request),
};

export default api;
