
type InputProps = {
    type: string
}

const Input = ({ type }: InputProps) => {
  return (
    <input type={type} className='h-[2.5rem] w-[20rem] focus:outline-slate-500 border-[.1rem] border-slate-300
    rounded-lg px-2 testScreen:w-[15rem]' />
  )
}

export default Input