

type InputProps = {
    type: string,
    name?: string,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
}

const HalfInput = ({ type, name, placeholder, value, onChange, className }: InputProps) => {
  return (
    <input type={type} name={name} placeholder={placeholder} value={value} 
      onChange={onChange} 
      className={`${className} h-[2.5rem] w-[10rem] focus:outline-slate-500
     border-[.1rem] border-slate-300 rounded-lg px-2`}/>
  )
}

export default HalfInput