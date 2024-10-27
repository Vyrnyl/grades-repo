
type InputProps = {
    type: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, name, value, onChange }: InputProps) => {

  return (
    <input type={type} name={name} value={value} onChange={onChange} className='h-[2.5rem] w-[20rem] focus:outline-slate-500 border-[.1rem] border-slate-300
    rounded-lg px-2 testScreen:w-[15rem]' />
  )
}

export default Input