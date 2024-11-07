import nameAcronym from "../../../utils/nameAcronym";
import yearSuffix from "../../../utils/yearSuffix";

type ProfileType = {
  firstName: string | undefined,
  lastName: string | undefined,
  yearLevel: number | undefined
}

const Profile = ({ firstName, lastName, yearLevel }: ProfileType) => {

  const suff = yearSuffix(yearLevel);
  const acronym = nameAcronym(firstName + ' ' + lastName);

  return (
    <div className='bg-re-200 w-[15rem] h-[3rem] flex gap-2'>
        <div className='bg-gray-800 w-[3rem] rounded-full grid place-items-center'>
            <span className='font-bold text-white'>{acronym}</span>
        </div>
        <div>
            <h5 className='font-bold'>{firstName} {lastName}</h5>
            <p className=''>{(yearLevel || '') + suff} Year</p>
        </div>
    </div>
  )
}

export default Profile