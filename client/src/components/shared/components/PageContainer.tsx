import { ReactNode } from "react"

type PageContainerProps = {
    children: ReactNode
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className='bg-slate-100 h-[96%] flex flex-col flex-[.8] shadow-pageComponentShadow 
      rounded-lg'>{children}</div>
  )
}

export default PageContainer