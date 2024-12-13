import { ReactNode } from 'react'

type ActivityContainerProps = {
  children: ReactNode
}

const ActivityContainer = ({ children }: ActivityContainerProps) => {
  return (
    <div className='bg-slate-100 h-[23rem] w-[100%] flex flex-col shadow-pageComponentShadow rounded-lg'>
      <h1 className='text-lg font-medium py-2 px-4'>Recent Activity</h1>
      {children}
    </div>
  )
}

export default ActivityContainer