
type ClassInputProps = {
    type: string,
    value?: string,
    name?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ClassInput = ({ type, name, value, onChange }: ClassInputProps) => {
  return (
    <input className='bg-slate-100 h-[2.5rem] w-[17rem] focus:outline-slate-500 border-[.1rem] border-slate-300
    rounded-lg px-2 testScreen:w-[15rem]' type={type} value={value} onChange={onChange} name={name} />
  )
}

export default ClassInput