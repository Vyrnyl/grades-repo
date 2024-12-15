import { create } from "zustand";


type useSemType = {
    semester: number,
    setSemester: (semester: number) => void
}

const useSemStore = create<useSemType>()((set) => ({
    semester: 1,
    setSemester: (semester: number) => set(() => ({ semester })),
}));

export default useSemStore;