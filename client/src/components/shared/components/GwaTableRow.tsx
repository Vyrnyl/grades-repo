
type GwaTableRowProps = {
    sem: string,
    year: number,
    gwa: number,
    status: string
}

const GwaTableRow = ({ sem, year, gwa, status }: GwaTableRowProps) => {
  return (
    <tr className="font-[500] text-slate-700">
        <td className="px-4 py-1">{sem} Semester {year}</td>
        <td className="px-4 py-1">{gwa}</td>
        <td className="px-4 py-1">{status}</td>
    </tr>
  )
}

export default GwaTableRow