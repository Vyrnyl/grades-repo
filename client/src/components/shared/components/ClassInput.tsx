
type ClassInputProps = {
    type: string
}

const ClassInput = ({ type }: ClassInputProps) => {
  return (
    <input className='h-[2.5rem] w-[17rem] focus:outline-slate-500 border-[.1rem] border-slate-300
    rounded-lg px-2 testScreen:w-[15rem]' type={type} />
  )
}

export default ClassInput