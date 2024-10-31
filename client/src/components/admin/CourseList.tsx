import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const CourseList = () => {
  return (
    <li className="bg-purpl-300 flex justify-between px-10 py-4 border-b-2 border-l-2
        border-r-2 border-slate-500">
        <p className='text-slate-700 font-medium text-[1rem]'>Bachelor of Science in Accountancy (BSA)</p>
        <div className="bg-re-300 flex gap-6">
        <FontAwesomeIcon className="text-blue-500" icon={faPenToSquare}/>
        <FontAwesomeIcon className="text-red-500" icon={faTrashCan}/>
        </div>
    </li> 
  )
}

export default CourseList