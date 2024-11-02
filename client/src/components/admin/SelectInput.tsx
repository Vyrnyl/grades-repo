import { ReactNode } from "react"

type SelectInput = {
    children: ReactNode
    value?: string,
    onChange?: () => void,
    className?: string
}

const SelectInput = ({ children, value, onChange, className } : SelectInput) => {
  return (
    <select required defaultValue="" value={value} onChange={onChange} className={`bg-re-300 h-[2.5rem] focus:outline-slate-500
        border-[.1rem] border-slate-500 rounded-lg px-2 text-[.8rem] ${className} w-[65%]`}>
        {children}
        {/* <option value="" disabled>User Type</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option> */}
    </select>
  )
}

export default SelectInput