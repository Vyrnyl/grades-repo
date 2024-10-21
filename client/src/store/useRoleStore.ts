import { create } from "zustand";

type userRoleType = {
    userRole: string,
    setUserRole: (userRole: string) => void
}

const useuserRoleStore = create<userRoleType>()((set) => ({
    userRole: '',
    setUserRole: () => set((state) => ({ userRole: state.userRole }))
}));

export default useuserRoleStore;