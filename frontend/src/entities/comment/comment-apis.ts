import axiosInstance from '../../shared/utils/axiosInstance';

const url = '/api/comment';
const api = {
  createComment: (feedId: number, content: string) => axiosInstance.post(`${url}/${feedId}/create`, { feedId, content }),
  updateComment: (commentId: number, content: string) => axiosInstance.put(`${url}/${commentId}/update`, { commentId, content }),
  deleteComment: (commentId: number) => axiosInstance.delete(`${url}/${commentId}/delete`),
};

export default api;
