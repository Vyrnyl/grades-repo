
const SaveButton = ({ onClick } : { onClick?: () => void }) => {
  return (
    <button onClick={onClick} className='bg-slate-400 h-[2rem] text-lg font-medium px-6 rounded-md active:bg-slate-700
    active:text-white'>Save</button>
  )
}

export default SaveButton