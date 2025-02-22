import nameAcronym from "../../../utils/nameAcronym";
import yearSuffix from "../../../utils/yearSuffix";

type ProfileType = {
  firstName: string | undefined,
  middleName: string | undefined,
  lastName: string | undefined,
  yearLevel: number | undefined,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  imgSrc?: string,
  isImageError?: boolean
}

const Profile = ({ firstName, middleName, lastName, yearLevel, className, onClick, imgSrc, isImageError }: ProfileType) => {

  const suff = yearSuffix(yearLevel);
  const acronym = nameAcronym(firstName + ' ' + lastName);
  
  return (
    <div onClick={onClick} className={`${className} bg-re-200 w-[15rem] h-[3rem] flex gap-2`}>
        <div className='bg-gray-800 cursor-pointer w-[3rem] rounded-full grid place-items-center'>
          {isImageError ? <span className='font-bold text-white'>{acronym}</span> : 
            <img src={imgSrc} alt="" className='h-[3rem] w-[3rem] rounded-full object-cover' />
          }
          
            
        </div>
        <div>
            <h5 className='font-bold'>{firstName} {middleName && middleName !== '' ? `${middleName.charAt(0)}.` : ''} {lastName}</h5>
            {yearLevel !== 0 && <p className=''>{(yearLevel || '') + suff} {yearLevel && 'Year'}</p>}
        </div>
    </div>
  )
}

export default Profile