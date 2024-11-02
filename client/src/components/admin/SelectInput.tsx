import { ReactNode } from "react"

type SelectInput = {
    children: ReactNode
    value?: string,
    name?: string,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    className?: string
}

const SelectInput = ({ children, name, value, onChange, className } : SelectInput) => {
  return (
    <select required name={name} value={value} onChange={onChange} className={`bg-re-300 h-[2.5rem] focus:outline-slate-500
        border-[.1rem] border-slate-500 rounded-lg px-2 text-[.8rem] ${className}`}>
        {children}
        {/* <option value="" disabled>User Type</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option> */}
    </select>
  )
}

export default SelectInput