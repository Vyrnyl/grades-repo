import { create } from "zustand";
import { User } from "../types/studentTypes";

type StudentType = {
    students: User[],
    setStudents: (students: User[]) => void
}

const useStudentStore = create<StudentType>()((set) => ({
    students: [],
    setStudents: (newStudents: User[]) => set(() => ({ students: newStudents }))
}));

export default useStudentStore;