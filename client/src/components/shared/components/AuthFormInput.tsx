
type AuthFormInputType = {
  type?: string,
  label?: string,
  name?: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
  errorMessage?: string
}

const AuthFormInput = ({ type, label, name, value, onChange, onFocus, errorMessage }: AuthFormInputType) => {

  // const [invalidInput, setInvalidInput] = useState<{ path: string, message: string }[]>([]);

  return (
    <div className="bg-cya-300 w-[65%] h-[2.4rem] leading-[.8rem]">
      <input type={type} name={name} value={value} onChange={onChange} onFocus={onFocus} placeholder={label} className='bg-transparent w-[100%] 
      h-[2.4rem] border-[.13rem] border-slate-500 rounded-lg focus:outline-slate-500 px-2 font-[400] focus:placeholder-transparent
      placeholder:text-slate-700 placeholder:text-start placeholder:text-[.8rem]'/>
      <span className="text-[.8rem] text-red-500 ml-2">{errorMessage}</span>
    </div>
  )
}

export default AuthFormInput