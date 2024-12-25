
type InputProps = {
    type: string,
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
    className?: string,
    max?: number,
    placeholder?: string,
    required?: boolean,
    pattern?: string,
    title?: string
}

const Input = ({ type, name, value, onKeyDown, onChange, className, max, placeholder, required, pattern, title }: InputProps) => {

  return (
    <input type={type} name={name} value={value} onKeyDown={onKeyDown} onChange={onChange} max={max} placeholder={placeholder} 
    className={`${className} h-[2.5rem] focus:outline-slate-500 border-[.01rem] border-slate-300
    rounded-lg px-2 testScreen:w-[15rem]`} required={required} pattern={pattern} title={title} />
  )
}

export default Input