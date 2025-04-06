import { create } from "zustand";

type IsGradePassed = {
    isPassed: boolean,
    setIsPassed: (isPassed: boolean) => void
}

const useIsPassed = create<IsGradePassed>()((set) => ({
    isPassed: false,
    setIsPassed: (isPassed: boolean) => set(() => ({ isPassed }))
}));

export default useIsPassed;