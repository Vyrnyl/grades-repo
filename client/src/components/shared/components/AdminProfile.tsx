import nameAcronym from "../../../utils/nameAcronym";

type AdminProfileProps = {
  name: string
}

const AdminProfile = ({ name }: AdminProfileProps) => {

  const acronym = nameAcronym(name);

  return (
    <div className='bg-cya-200 h-[5rem] flex flex-col items-center justify-end pt-4 relative'>
        <div className='bg-gree-200 flex justify-center items-center gap-[1rem] pr-[2rem] pb-2 absolute bottom-[-1rem]'>
            <div className='bg-green-300 h-[2.5rem] w-[2.5rem] rounded-full grid place-items-center font-medium '>{acronym}</div>
            <span className='font-medium text-white'>{name}</span>
        </div>
        <hr className='bg-slate-600 h-[.15rem] w-[80%] rounded-lg absolute bottom-[-1rem]' />
    </div>
  )
}
export default AdminProfile