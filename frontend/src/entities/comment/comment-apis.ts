import jwtAxiosInstance from '../../shared/utils/jwtAxiosInstance';

const url = '/api/comment';
const api = {
  createComment: (feedId: number, content: string) => jwtAxiosInstance.post(`${url}/${feedId}/create`, { feedId, content }),
  updateComment: (commentId: number, content: string) => jwtAxiosInstance.put(`${url}/${commentId}/update`, { commentId, content }),
  deleteComment: (commentId: number) => jwtAxiosInstance.delete(`${url}/${commentId}/delete`),
};

export default api;
