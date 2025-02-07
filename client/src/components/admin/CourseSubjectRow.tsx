import { useEffect, useState } from "react";
import { AddedCourseType } from "../../types/types";
import yearSuffix from "../../utils/yearSuffix";

type CourseSubjectRow = {
    value: AddedCourseType,
    handleChange: (courseCode: string) => void,
    isChecked?: boolean,
    handledSem: (courseSem: string) => void,
    handledYear: (yearLevel: string) => void,
    sem: any,
    year: any
}

const CourseSubjectRow = ({ value, handleChange, isChecked, handledSem, handledYear, sem, year } : CourseSubjectRow) => {
    
    const [semester, setSemester] = useState<string>('');
    const [yearLevel, setYearLevel] = useState<string>('');

    useEffect(() => {
        if(sem) setSemester(sem.semester);
        if(year) setYearLevel(year.yearLevel && `${year.yearLevel}${yearSuffix(year.yearLevel)}`);
    }, [sem, year]);
    
        
    return <tr className="bg-slate-100 hover:bg-slate-200">
        <td className="px-4 py-4 text-center border-2 border-slate-500">
            <input type="checkbox" value={value.courseCode} 
            checked={isChecked} 
            onChange={() => {
                handleChange(value.courseCode);
                setSemester('');
                setYearLevel('');
            }}/>
        </td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{value.courseCode}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{value.courseTitle}</td>
        <td className="px-2 py-4 text-center border-2 border-slate-500">{value.units}</td>
        <td className="px-2 py-4 text-center border-2 border-slate-500">
            <select className={`h-[1.5rem] text-[.8rem] text-slate-600 font-semibold rounded-sm border-2
             px-2 mr-2 ${!isChecked ? 'pointer-events-none border-slate-300' : 'border-slate-700'}`} 
                value={semester} onChange={(e) => {
                handledSem(`${value.courseCode} ${e.target.value}`);
                setSemester(e.target.value);
            }}>
                <option className='text-slate-600 font-semibold' value={''} disabled>select</option>
                <option className='text-slate-600 font-semibold' value={'1'}>1st</option>
                <option className='text-slate-600 font-semibold' value={'2'}>2nd</option>
            </select>
        </td>
        <td className="px-2 py-4 text-center border-2 border-slate-500">
            <select className={`h-[1.5rem] text-[.8rem] text-slate-600 font-semibold rounded-sm border-2
             px-2 mr-2 ${!isChecked ? 'pointer-events-none border-slate-300' : 'border-slate-700'}`}
                value={yearLevel}
                onChange={(e) => {
                    setYearLevel(e.target.value);
                    handledYear(`${value.courseCode} ${e.target.value}`);
                }}>
                <option className='text-slate-600 font-semibold' value={''} disabled>select</option>
                <option className='text-slate-600 font-semibold' value={'1st'}>1st</option>
                <option className='text-slate-600 font-semibold' value={'2nd'}>2nd</option>
                <option className='text-slate-600 font-semibold' value={'3rd'}>3rd</option>
                <option className='text-slate-600 font-semibold' value={'4th'}>4th</option>
            </select>
        </td>
    </tr>
}

export default CourseSubjectRow;