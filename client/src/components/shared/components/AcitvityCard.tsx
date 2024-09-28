import UserIconBox from "./UserIconBox"
import { faUser } from "@fortawesome/free-solid-svg-icons"

type AcitvityCardProps = {
    label: string,
    loginData?: number
}

const AcitvityCard = ({ label, loginData }: AcitvityCardProps) => {
  return (
    <div className='bg-cya-400 h-[10rem] w-[17rem] rounded-lg card-shadow px-[1rem] flex flex-col gap-2'>
        <div className="bg-gree-300 flex justify-between relative py-1">
            <div className="absolute top-[-1.2rem]">
                <UserIconBox icon={faUser}/>
            </div>
            <div></div>
            <h1 className='text-slate-700 font-medium text-[1rem]'>{label}</h1>
        </div>
        <h1 className="self-end text-slate-700 font-bold text-[1.2rem]">{loginData}</h1>
    </div>
  )
}

export default AcitvityCard