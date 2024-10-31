import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StudentRow = () => {
  return (
    <tr className="bg-slate-100 hover:bg-slate-200 border-b-2 border-l-2 border-r-2 border-slate-500">
        <td className="p-4 text-center">2021-02167</td>
        <td className="p-4 text-center">Lea Jinx Lore</td>
        <td className="p-4 text-center">4B</td>
        <td className="p-4 text-center">BS Accountancy</td>
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