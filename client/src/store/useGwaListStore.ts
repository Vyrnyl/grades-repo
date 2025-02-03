import { create } from "zustand";

type GwaList = { 
    semester: number, 
    yearLevel: number,
    gwa: number, 
    status: string 
};

type useGwaListType = {
    gwaList: GwaList[];
    setGwaList: React.Dispatch<React.SetStateAction<GwaList[]>>;
};

const useGwaListStore = create<useGwaListType>((set) => ({
    gwaList: [],
    setGwaList: (update) =>
        set((state) => ({
            gwaList: typeof update === "function" ? update(state.gwaList) : update,
        })),
}));

export default useGwaListStore;