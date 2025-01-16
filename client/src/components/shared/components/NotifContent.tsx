import { ReactNode } from 'react'

type NotifContentProps = {
    children: ReactNode
}

const NotifContent = ({ children }: NotifContentProps) => {
  return (
    <li className='py-[.5rem] font-[500] text-slate-700'>{children}</li>
  )
}

export default NotifContent