
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/studentTypes';


const FacultyRow = ({ faculty }: { faculty: User }) => {

  const {
    studentId,
    firstName,
    lastName,
    email,
    status
  } = faculty;

  return (
    <tr className="bg-slate-100 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
    <td className="p-4 text-center">{studentId}</td>
    <td className="p-4 text-center">{`${firstName} ${lastName}`}</td>
    {/* <td className="p-4 text-center">CBA</td> */}
    <td className="p-4 text-center">{email}</td>
    <td className="p-4 text-center">{status}</td>
    <td className="py-4 px-10">
        <div className="flex gap-6 justify-center">
            <FontAwesomeIcon className="text-blue-500" icon={faPenToSquare}/>
            <FontAwesomeIcon className="text-red-500" icon={faTrashCan}/>
        </div>
    </td>
</tr>
  )
}

export default FacultyRow