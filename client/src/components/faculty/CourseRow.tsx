import { User } from "../../types/studentTypes"

const CourseRow = ({ student } : { student: User}) => {
  return (
    <tr className="bg-slate-100 hover:bg-slate-200 ">
        <td className="px-4 py-4 text-center border-2 border-slate-500">{student.studentId}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{`${student.firstName} ${student.lastName}`}</td>
        <td className="px-2 py-4 text-center border-2 border-slate-500">{`${student.program.programCode} 
        ${student.yearLevel}${student.block}`}</td>
        <td className="px-2 py-4 text-center border-2 border-slate-500">{student.sex}</td>
    </tr>
  )
}

export default CourseRow