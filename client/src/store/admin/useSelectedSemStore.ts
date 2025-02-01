import { create } from 'zustand'

type useSelectedSemType = {
    selectedSem: number,
    setSelectedSem: (semester: number) => void
};

const useSelectedSemStore = create<useSelectedSemType>()((set) => ({
    selectedSem: 1,
    setSelectedSem: (selectedSem: number) => set(() => ({ selectedSem }))
}));

export default useSelectedSemStore;