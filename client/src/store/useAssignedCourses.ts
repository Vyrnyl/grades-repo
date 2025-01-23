import { create } from "zustand";
import { AddedCourseRecord } from "../types/types";

type useAssignedCoursesType = {
    assignedCourses: AddedCourseRecord[],
    setAssignedCourses: React.Dispatch<React.SetStateAction<AddedCourseRecord[]>>
}

const useAssignedCourses = create<useAssignedCoursesType>((set) => ({
    assignedCourses: [],
    setAssignedCourses: (update) => 
        set((state) => ({
            assignedCourses: typeof update === "function" ? update(state.assignedCourses) : update
        }))
}));

export default useAssignedCourses;