import { Link, useLocation } from "react-router-dom"

type SideBarLinkProps = {
    path: string,
    label: string
}

const SideBarLink = ({ path, label }: SideBarLinkProps) => {

  const loc = useLocation();

  return (
    <li className={`${loc.pathname == path && 'text-blue-300'} active:text-slate-700`}>
      <Link to={path}>{label}</Link>
    </li>
  )
}

export default SideBarLink