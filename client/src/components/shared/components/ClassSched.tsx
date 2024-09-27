import { faCalendar, faLocationPin, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ClassSchedProps = {
    courseCode: string,
    day: string,
    time: string,
    room: string
}

const ClassSched = ({ courseCode,  day, time, room }: ClassSchedProps) => {

    const colors: { [key: string]: string }  = {
        pink: 'bg-pink-200',
        green: 'bg-green-200',
        purple: 'bg-purple-200',
        cyan: 'bg-cyan-200',
        orange: 'bg-orange-200',
      };
      
      const colorKeys = Object.keys(colors);
      const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const randomColor = colors[randomKey];

    return (
        <div className={`${randomColor} h-[11rem] w-[13rem] flex flex-col text-nowrap overflow-hidden 
            px-[1rem] py-4 gap-2 rounded-md class-shadow`}>
            <h1 className="font-bold">{courseCode}</h1>
            <hr className='bg-slate-700 h-[.1rem] w-[100%] border-none rounded-lg self-start'/>
            <div className="flex bg-cya-200 items-center gap-2">
                <FontAwesomeIcon icon={faCalendar}/>
                <p>{day}</p>
            </div>
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationPin}/>
                <p>{time}</p>
            </div>
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock}/>
                <p>{room}</p>
            </div>      
        </div>            
    )
}

export default ClassSched