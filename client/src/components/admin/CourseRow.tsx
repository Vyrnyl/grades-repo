import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const CourseRow = () => {
  return (
    <tr className="bg-purpl-300 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
      <td className="py-4 px-10">Bachelor of Science in Accountancy (BSA)</td>
      <td className="py-4 px-10">
          <div className="flex gap-6">
            <FontAwesomeIcon className="text-blue-500" icon={faPenToSquare}/>
            <FontAwesomeIcon className="text-red-500" icon={faTrashCan}/>
          </div>
      </td>
    </tr>
  )
}

export default CourseRow