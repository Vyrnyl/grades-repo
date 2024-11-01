import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/studentTypes';


const StudentRow = ({ student }: { student: User }) => {
  
  const {
    studentId,
    firstName,
    lastName,
    yearLevel,
    block,
    status
  } = student;

  let program = '';
  if(student.program) {
    const { programName } = student.program;
    program = `BS ${programName.split(' in ')[1]}`;
  }

  return (
    <tr className="bg-slate-100 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
        <td className="p-4 text-center">{studentId || ''}</td>
        <td className="p-4 text-center">{`${firstName} ${lastName}`}</td>
        <td className="p-4 text-center">{`${yearLevel || ''}${block || ''}`}</td>
        <td className="p-4 text-center">{program}</td>
        <td className="p-4 text-center">{status || ''}</td>
        <td className="py-4 px-10">
            <div className="flex gap-6 justify-center">
                <FontAwesomeIcon className="text-blue-500" icon={faPenToSquare}/>
                <FontAwesomeIcon className="text-red-500" icon={faTrashCan}/>
            </div>
        </td>
    </tr>
  )
}

export default StudentRow