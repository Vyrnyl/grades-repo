

const SelectInput = () => {
  return (
    <select name="gender" className='bg-re-300 h-[2.5rem] w-[10rem] focus:outline-slate-500
    border-[.1rem] border-slate-300 rounded-lg px-2'>
        <option>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>
  )
}

export default SelectInput