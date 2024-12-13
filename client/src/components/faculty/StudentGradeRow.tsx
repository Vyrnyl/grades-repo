import { faPenToSquare, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StudentRecord } from '../../types/types'
import { SetStateAction, useEffect, useState } from 'react'

type StudentGradeRowProps = {
  student: StudentRecord,
  courseId: number,
  courseCode: string,
  closeEdit?: boolean,
  setCloseEdit: (value: React.SetStateAction<boolean>) => void
}

const StudentGradeRow = ({ student, courseId, courseCode, setCloseEdit, closeEdit } : StudentGradeRowProps) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

  const [grade, setGrade] = useState<number | null>(null);
  let programCode = '';
  if(student.program) programCode = student.program.programCode;
  
  //Set Grade
  useEffect(() => {
    
    if(student.bsaStudentRecord.length > 0) {
      const grade = student.bsaStudentRecord.find(record => record.bsaCurriculum?.courseCode == courseCode);
      if(grade) setGrade(grade?.grade);
    }
    if(student.bsbaStudentRecord.length > 0) {
      const grade = student.bsbaStudentRecord.find(record => record.bsbaCurriculum?.courseCode == courseCode);
      if(grade) setGrade(grade?.grade);
    }
    if(student.bsmaStudentRecord.length > 0) {
      const grade = student.bsmaStudentRecord.find(record => record.bsmaCurriculum?.courseCode == courseCode);
      if(grade) setGrade(grade?.grade);
    }
    
  }, [courseId]);
  

  //Edit grade
  const [editGrade, setEditGrade] = useState<number | string | null>(grade);

  
  const handleEditClick = () => {
    if(!closeEdit) setIsEdit(true);
    if(closeEdit){
      setCloseEdit(false);
      setIsEdit(true);
    }
    setEditGrade(grade);
  }
  
  const handleGradeUpdate = async () => {
    setIsEdit(false); 
    
    try {
      const res = await fetch(`${apiUrl}/grade/update-grade`, {
        method: 'PUT',
        headers: {
          'Authorization': token ? token : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: student.id,
          programId: student.program.id,
          courseCode: courseCode,
          grade: editGrade
        })
      });

      const data = await res.json();

      if(data) setGrade(Number(editGrade));

    } catch(err) {
      console.log('Update error');
    }
    
  }



  //Style
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if(closeEdit) setIsEdit(false);
  }, [closeEdit]);

  return (
    <tr className="bg-slate-100 hover:bg-slate-200 ">
      <td className="px-4 py-4 text-center border-2 border-slate-500">
        {`${student.firstName.charAt(0) === '@' ? student.firstName.slice(1) : student.firstName} ${student.lastName}`}</td>
      <td className="px-4 py-4 text-center border-2 border-slate-500">{`${student.studentId}`}</td>
      <td className="px-2 py-4 text-center border-2 border-slate-500">{`${programCode || ''} 
      ${student.yearLevel || ''}${student.block || ''}`}</td>
      <td className="px-2 py-4 text-center border-2 border-slate-500">
        {!isEdit || closeEdit ? `${grade == 0 ? '' : grade || ''}` : 
          <input type="number" className='bg-transparent h-[1.4rem] w-[100%] focus:outline-none border-b-2 border-slate-500
          rounded-sm px-2 text-center' value={editGrade || ''} onChange={(e) => setEditGrade(e.target.value)}/>
        }
        
      </td>
      <td className="px-2 py-4 text-center border-2 border-slate-500">
          <div className='flex gap-4 justify-center'>
          {!isEdit || closeEdit ? 
              <FontAwesomeIcon className="text-blue-500 active:text-white" 
              icon={faPenToSquare} onClick={handleEditClick}/> : 

              <FontAwesomeIcon className="text-blue-500 active:text-white" 
              icon={faSave} onClick={handleGradeUpdate}/>
          }
          {/* <FontAwesomeIcon className="text-red-500 active:text-white" 
              icon={faTrashCan}/> */}
          </div>
      </td>
    </tr>
  )
}

export default StudentGradeRow