import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons"

type UserIconBoxProps = {
    icon: IconDefinition
}

const UserIconBox = ({ icon }: UserIconBoxProps) => {

  return (
    <div className={`${icon == faUser ? 'bg-slate-800' : 'bg-pink-600'} h-[4rem] w-[4rem] rounded-lg grid place-items-center`}>
        <FontAwesomeIcon icon={icon} className={ `${icon != faUser ? 'text-white text-[1.5rem]' : 
          'p-[.3rem] bg-white rounded-full'}`}/>
    </div>
  )
}

export default UserIconBox