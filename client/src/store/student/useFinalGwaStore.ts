import { create } from "zustand";

type FinalGwa = {
    finalGwa: number,
    setFinalGwa: (finalGwa: number) => void
}

const useFinalGwaStore = create<FinalGwa>()((set) => ({
    finalGwa: 0,
    setFinalGwa: (finalGwa: number) => set(() => ({ finalGwa }))
}));

export default useFinalGwaStore