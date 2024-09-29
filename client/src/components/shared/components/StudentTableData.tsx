
type StudentTableDataProps = {
    profilePic?: string,
    name: string,
    studentId: string,
    yearBlock: string,
    grade: number
}

const StudentTableData = ({ name, studentId, yearBlock, grade }: StudentTableDataProps) => {

    const colors: { [key: string]: string }  = {
        pink: 'bg-pink-200',
        green: 'bg-green-200',
        purple: 'bg-purple-200',
        cyan: 'bg-cyan-200',
        orange: 'bg-orange-200',
      };
      
      const colorKeys = Object.keys(colors);
      const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const randomColor = colors[randomKey];


      const pfp = name.split(' ');
      const pfpName = pfp[0][0] + pfp[1][0];

    return (
        <div className='flex font-medium text-slate-700 py-1 items-center hover:bg-slate-200'>
            <div className='bg-blu-300 w-[15rem] text-nowrap flex gap-2 items-center'>
                <div className={`${randomColor} h-[1.5rem] w-[1.5rem] min-h-[1.7rem] min-w-[1.7rem] 
                rounded-full flex items-center justify-center`}>{pfpName}</div>
                <span className='text-wrap'>{name}</span>
            </div>
            <div className='flex-[8%]'>{studentId}</div>  
            <div className='flex-[8%]'>{yearBlock}</div>
            <div className='flex-[8%]'>{grade}</div>
        </div> 
    )
}
export default StudentTableData