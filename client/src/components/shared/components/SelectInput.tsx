import React from "react"

type SelectInputType = {
  name: string,
  value: string,
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const SelectInput = ({ name, value, onChange }: SelectInputType ) => {
  return (
    <select name={name} onChange={onChange} className='bg-re-300 h-[2.5rem] w-[10rem] focus:outline-slate-500
    border-[.1rem] border-slate-300 rounded-lg px-2'>
        <option>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>
  )
}

export default SelectInput