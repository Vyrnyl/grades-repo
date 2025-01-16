
type SaveButtonProp = {
  onClick?: (e: React.FormEvent) => void,
  className?: string,
  type?: "submit"
}

const SaveButton = ({ onClick, className, type } : SaveButtonProp) => {
  return (
    <button type={type} onClick={onClick} className={`h-[2rem] text-lg font-medium px-6 rounded-md active:bg-slate-300
    active:text-white ${className}`}>Save</button>
  )
}

export default SaveButton