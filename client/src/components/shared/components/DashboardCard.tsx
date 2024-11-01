import UserIconBox from "./UserIconBox"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

type DashboardCardProps = {
  label: string,
  icon: IconDefinition,
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const DashboardCard = ({ label, icon, onClick }: DashboardCardProps) => {
  return (
    <div className='bg-cya-400 h-[10rem] w-[21rem] rounded-lg card-shadow active:scale-100 hover:scale-[102%]' onClick={onClick}>
      <div className="bg-re-300 flex justify-between px-[1rem] relative">
        <div className="bg-cya-300 absolute top-[-1.2rem]">
          <UserIconBox icon={icon}/>
        </div>
        <div></div>
        <h1 className='text-slate-700 font-medium text-[1.3rem]'>{label}</h1>
      </div>
    </div>
  )
}

export default DashboardCard