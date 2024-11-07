
type SaveButtonProp = {
  onClick?: (e: React.FormEvent) => void,
  className?: string
}

const SaveButton = ({ onClick, className } : SaveButtonProp) => {
  return (
    <button onClick={onClick} className={`h-[2rem] text-lg font-medium px-6 rounded-md active:bg-slate-300
    active:text-white ${className}`}>Save</button>
  )
}

export default SaveButton