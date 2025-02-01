
const GwaRow = ({ className } : { className?: string }) => {

    return (
        <tr className={`${className} bg-slate-100 hover:bg-slate-200`}>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>1st Semester 2021-2022</td>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>2.3</td>
            <td className='px-4 py-6 text-center border-2 border-slate-500'>Average</td>
        </tr>
    )
}

export default GwaRow