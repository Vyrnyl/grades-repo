
const GwaRow = ({ gwaInfo, className } : { gwaInfo: { sem: string, gwa: number, status: string }, className?: string }) => {

    return (
        <tr className={`${className} bg-slate-100 hover:bg-slate-200`}>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>{`${gwaInfo.sem}`} Semester</td>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>{gwaInfo.gwa}</td>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>{gwaInfo.status}</td>
        </tr>
    )
}

export default GwaRow