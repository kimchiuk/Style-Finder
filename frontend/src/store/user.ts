import create from 'zustand'

interface UserStore {
    pk: number
    id: string
    nickname: string
    likes: string[]
    dislikes: string[]
    setNickname: (newNickname: string) => void
}

const useUserStore = create<UserStore>((set) => ({
    pk: 0,
    id: '',
    nickname: '',
    likes: [],
    dislikes: [],
    setNickname: (newNickname: string) => set({ nickname: newNickname }),
}))

export default useUserStore
