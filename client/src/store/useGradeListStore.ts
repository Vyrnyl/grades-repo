import { create } from "zustand";
import { CourseType } from "../types/types";

type useGwaListType = {
    gradeList: CourseType[][];
    setGradeList: React.Dispatch<React.SetStateAction<CourseType[][]>>;
};

const useGradeListStore = create<useGwaListType>((set) => ({
    gradeList: [],
    setGradeList: (update) =>
        set((state) => ({
            gradeList: typeof update === "function" ? update(state.gradeList) : update,
        })),
}));

export default useGradeListStore;