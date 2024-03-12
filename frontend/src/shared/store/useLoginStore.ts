import { create } from 'zustand';

export interface LoginStore {
  isLogin: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  setLogin: () => set({ isLogin: true }),
  setLogout: () => set({ isLogin: false }),
}));

export default useLoginStore;
