import logo from '../../../assets/images/cictLogo.jpg'
const Logo = () => {
  return (
    <div className=' bg-re-200 flex justify-center items-end h-[30%] py-1'>
      <img className='h-[8rem] rounded-full outline outline-2 outline-white' src={logo} alt="CICT Logo" />
    </div>
  )
}

export default Logo