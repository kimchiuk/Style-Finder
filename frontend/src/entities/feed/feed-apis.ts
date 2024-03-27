import axiosInstance from '../../shared/utils/axiosInstance';

import { FeedCreateRequestDTO, FeedUpdateRequestDTO } from './feed-types';

const url = '/api/feed';
const api = {
  readFeedList: () => axiosInstance.get(`${url}`),
  createFeedCoordi: (request: FeedCreateRequestDTO, feedThumbnail: File[]) => axiosInstance.post(`${url}/create`, { request, feedThumbnail }),

  readFeed: (feedId: number) => axiosInstance.get(`${url}/${feedId}`),
  deleteFeed: (feedId: number) => axiosInstance.delete(`${url}/${feedId}`),
  updateFeed: (feedId: number, request: FeedUpdateRequestDTO, multipartFile: File[]) => axiosInstance.put(`${url}/update/${feedId}`, { feedId, request, multipartFile }),

  readPopularFeedList: () => axiosInstance.get(`${url}/popularity`),
  //searchByTitle: (title: string, pageable: number) => axiosInstance.get(`${url}/search`, { title, pageable }),

  uploadFile: (multipartFile: File[]) => axiosInstance.post(`$/file`, multipartFile),
};

export default api;
