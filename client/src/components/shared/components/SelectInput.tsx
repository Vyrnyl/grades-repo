import React from "react"

type SelectInputType = {
  name?: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const SelectInput = ({ name, value, onChange }: SelectInputType ) => {
  return (
    <select name={name} value={value} onChange={onChange} className='bg-re-300 h-[2.5rem] w-[10rem] focus:outline-slate-500
    border-[.1rem] border-slate-300 rounded-lg px-2'>
        <option value="" disabled>None</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
  )
}

export default SelectInput