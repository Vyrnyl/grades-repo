import yearSuffix from "../../utils/yearSuffix"

const GwaRow = ({ className, gwa } : { className?: string, gwa: { semester: number, gwa: number, status: string, yearLevel: number } }) => {
    

    return (
        <tr className={`${className} bg-slate-100 hover:bg-slate-200`}>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>
                {gwa ? `${gwa.yearLevel}${yearSuffix(gwa.yearLevel)} Year - ` : ''}{`${gwa ? gwa.semester : ''}${yearSuffix( gwa && gwa.semester)}`} Semester</td>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>
                {gwa && (Number.isInteger(Number(gwa.gwa)) ? (typeof gwa.gwa === 'number' && `${gwa.gwa}.0`) : gwa.gwa)}</td>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>{gwa && gwa.status}</td>
        </tr>
    )
}


export default GwaRow