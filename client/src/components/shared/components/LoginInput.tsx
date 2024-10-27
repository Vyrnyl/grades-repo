
type LoginInputType = {
  type: string,
  label: string,
  name?: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginInput = ({ type, label, name, value, onChange }: LoginInputType) => {
  return (
    <input type={type} name={name} value={value} onChange={onChange} placeholder={label} className='bg-transparent w-[65%] 
      h-[2.4rem] border-[.13rem] border-slate-500 rounded-lg focus:outline-slate-500 px-2 font-[400] focus:placeholder-transparent
      placeholder:text-slate-700 placeholder:text-start placeholder:text-[.8rem]'/>
  )
}

export default LoginInput