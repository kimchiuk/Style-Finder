import create from 'zustand';

import { UserStore } from '../interface/user';

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
