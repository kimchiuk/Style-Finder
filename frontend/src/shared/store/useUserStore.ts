import { create } from 'zustand';

export interface UserStore {
  id: number;
  email: string;
  nickname: string;
  image: string;
  likes: string[];
  dislikes: string[];
  height: number;
  weight: number;
}

const useUserStore = create<UserStore>(() => ({
  id: 0,
  email: '',
  nickname: '',
  image: '',
  likes: [],
  dislikes: [],
  height: 0,
  weight: 0,
}));

export default useUserStore;
