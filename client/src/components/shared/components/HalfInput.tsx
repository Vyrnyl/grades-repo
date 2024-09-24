

type InputProps = {
    type: string,
    placeholder?: string,
}

const HalfInput = ({ type, placeholder }: InputProps) => {
  return (
    <input type={type} placeholder={placeholder} className='h-[2.5rem] w-[10rem] focus:outline-slate-500
     border-[.1rem] border-slate-300 rounded-lg px-2'/>
  )
}

export default HalfInput