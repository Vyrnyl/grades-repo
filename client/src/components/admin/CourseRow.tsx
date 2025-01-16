import { Program } from "../../types/studentTypes"

const CourseRow = ({ program }: { program: Program}) => {

  const { programCode, programName } = program;

  return (
    <tr className="bg-purpl-300 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
      <td className="py-4 px-10">{programName} <span>({programCode})</span></td>
      {/* <td className="py-4 px-10">
          <div className="flex gap-6">
            <FontAwesomeIcon className="text-blue-500" icon={faPenToSquare}/>
            <FontAwesomeIcon className="text-red-500" icon={faTrashCan}/>
          </div>
      </td> */}
    </tr>
  )
}

export default CourseRow