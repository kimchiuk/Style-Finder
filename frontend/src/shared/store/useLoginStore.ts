import { create } from 'zustand';

import { LoginStore } from '../types/user';

const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  setLogin: () => set({ isLogin: true }),
  setLogout: () => set({ isLogin: false }),
}));

export default useLoginStore;
