

const LoginInput = ({ label, type }: { label: string, type: string }) => {
  return (
    <input type={type} placeholder={label} className='bg-transparent w-[65%] h-[2rem] border-b-[.15rem]
     border-slate-500 focus:outline-none px-2 font-[500] focus:placeholder-transparent
      placeholder:text-slate-700 placeholder:font-bold placeholder:text-center'/>
  )
}

export default LoginInput