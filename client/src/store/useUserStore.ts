import { create } from "zustand";
import { User } from "../types/studentTypes";

type useUserType = {
    userInfo: User | null,
    setUserInfo: (userInfo: User | null) => void
}

const useUserStore = create<useUserType>((set) => ({
    userInfo: null,
    setUserInfo: (userInfo) => set({ userInfo })
}));

export default useUserStore;