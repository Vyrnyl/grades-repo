
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
  return (
    <div className='bg-gray-300 inline-block rounded-lg h-[3rem] w-[32rem]'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='bg-gree-300 w-[15%] h-[] text-[1.1rem] text-gray-600' />
        <input className='bg-gray-300 text-[1.1rem] w-[85%] h-[100%] rounded-r-lg px-2 focus:outline-slate-600 
        placeholder:text-gray-600'
        type="text" placeholder='Search Something' />
    </div>
  )
}

export default SearchBar