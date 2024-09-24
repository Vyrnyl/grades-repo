import { Link } from "react-router-dom"

type SideBarLinkProps = {
    path: string,
    label: string
}

const SideBarLink = ({ path, label }: SideBarLinkProps) => {
  return (
    <li className="active:text-slate-700"><Link to={path}>{label}</Link></li>
  )
}

export default SideBarLink