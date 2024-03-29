import axiosInstance from '../../shared/utils/axiosInstance';
import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';

import { FeedCreateRequestDTO, FeedUpdateRequestDTO } from './feed-types';

const url = '/api/feed';
const api = {
  readFeedList: (page: number) => axiosInstance.get(`${url}?page=${page}`),
  createFeedCoordi: (request: FeedCreateRequestDTO, feedThumbnail: File) => axiosInstance.post(`${url}/create`, { request, feedThumbnail }),

  readFeed: (feedId: number) => axiosInstance.get(`${url}/${feedId}`),
  deleteFeed: (feedId: number) => axiosInstance.delete(`${url}/${feedId}`),
  updateFeed: (feedId: number, request: FeedUpdateRequestDTO, multipartFile: File[]) => axiosInstance.put(`${url}/update/${feedId}`, { feedId, request, multipartFile }),

  readPopularFeedList: (page: number) => axiosInstance.get(`${url}/popularity?page=${page}`),
  readMyFeed: (page: number) => jwtAxiosInstance.get(`${url}/myfeed?page=${page}`),
  searchByTitle: (title: string, page: number) => axiosInstance.get(`${url}/search?title=${title}&page=${page}`),

  uploadFile: (multipartFile: File[]) => jwtAxiosInstance.post(`$/file`, multipartFile),
};

export default api;
