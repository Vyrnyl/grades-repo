
type InputProps = {
    type: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string,
    max?: number
}

const Input = ({ type, name, value, onChange, className, max }: InputProps) => {

  return (
    <input type={type} name={name} value={value} onChange={onChange} max={max} 
    className={`${className} h-[2.5rem] focus:outline-slate-500 border-[.1rem] border-slate-300
    rounded-lg px-2 testScreen:w-[15rem]`} />
  )
}

export default Input