import nameAcronym from "../../../utils/nameAcronym";
import randomColor from "../../../utils/randomColor";

type StudentTableDataProps = {
    profilePic?: string,
    name: string,
    studentId: string,
    yearBlock: string,
    grade: number
}

const StudentTableData = ({ name, studentId, yearBlock, grade }: StudentTableDataProps) => {

    const color = randomColor();
    const acronym = nameAcronym(name);

    return (
        <div className='flex font-medium text-slate-700 py-1 items-center hover:bg-slate-200'>
            <div className='bg-blu-300 w-[15rem] text-nowrap flex gap-2 items-center'>
                <div className={`${color} h-[1.5rem] w-[1.5rem] min-h-[1.7rem] min-w-[1.7rem] 
                rounded-full flex items-center justify-center text-[.8rem]`}>{acronym}</div>
                <span className='text-wrap'>{name}</span>
            </div>
            <div className='flex-[8%]'>{studentId}</div>  
            <div className='flex-[8%]'>{yearBlock}</div>
            <div className='flex-[8%]'>{grade}</div>
        </div> 
    )
}
export default StudentTableData