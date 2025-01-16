import { Link, useLocation } from "react-router-dom"

type SideBarLinkProps = {
    path: string,
    label: string,
    className?: string
}

const SideBarLink = ({ path, label, className }: SideBarLinkProps) => {

  const loc = useLocation();

  return (
    <li className={`active:text-slate-700 bg-cya-200 relative ${className}`}>
      <Link className="bg-re-200 relative z-10" to={path}>{label}</Link>
      <div className={`h-[2rem] w-[17.5rem] ${loc.pathname == path && 'bg-blue-500'} 
      z-0 absolute top-[50%] left-[-5.6rem] translate-y-[-50%] rounded-[.2rem]`}></div>
    </li>
  )
}

export default SideBarLink