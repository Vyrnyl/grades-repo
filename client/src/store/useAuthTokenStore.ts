import { create } from "zustand";

type TokenType = {
    isAuthenticated: boolean,
    setIsAuth: () => void
}

const useAuthTokenStore = create<TokenType>()((set) => ({
    isAuthenticated: false,
    setIsAuth: () => set(() => ({ isAuthenticated: true }))
}));

export default useAuthTokenStore;