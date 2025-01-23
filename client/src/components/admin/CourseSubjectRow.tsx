import { AddedCourseType } from "../../types/types";

type CourseSubjectRow = {
    value: AddedCourseType,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isChecked?: boolean
}

const CourseSubjectRow = ({ value, handleChange, isChecked } : CourseSubjectRow) => {


    return <tr className="bg-slate-100 hover:bg-slate-200">
        <td className="px-4 py-4 text-center border-2 border-slate-500">
            <input type="checkbox" value={value.courseCode} checked={isChecked} onChange={handleChange}/>
        </td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{value.courseCode}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{value.courseTitle}</td>
        <td className="px-2 py-4 text-center border-2 border-slate-500">{value.units}</td>
    </tr>
}

export default CourseSubjectRow;