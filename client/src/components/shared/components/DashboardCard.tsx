import UserIconBox from "./UserIconBox"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
type DashboardCardProps = {
  label: string,
  icon: IconDefinition,
  count: number,
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const DashboardCard = ({ label, icon, count, onClick }: DashboardCardProps) => {

  return (
    <div className='bg-cya-400 flex flex-col h-[10rem] w-[21rem] rounded-lg card-shadow active:scale-100 hover:scale-[102%]' onClick={onClick}>
      <div className="bg-re-300 flex justify-between px-[1rem] relative">
        <div className="bg-cya-300 absolute top-[-1.2rem]">
          <UserIconBox icon={icon}/>
        </div>
        <div></div>
        <h1 className='text-slate-700 font-semibold text-[1.3rem]'>{label}</h1>
      </div>
      <div className="bg-purpl-200 flex-1 text-slate-700 font-semibold text-[1.8rem] flex justify-end items-end">
        <span className="mr-4 mb-2">{count}</span>
      </div>
    </div>
  )
}

export default DashboardCard