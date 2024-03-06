// login info
export interface LoginInfo {
    email: string;
    password: string;
}

// loginStore
export interface LoginStore {
  isLogin: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

// userStore
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

// user
export interface User {
    id: number;
    email: string;
    nickname: string;
    password: string;
    image: string;
    likes: string[];
    dislikes: string[];
    height: number;
    weight: number;
  }