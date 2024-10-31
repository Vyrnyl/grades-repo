import { ReactNode } from "react"

type PageContainerProps = {
    children?: ReactNode,
    className?: string
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={`bg-slate-100 h-[96%] flex flex-col flex-[80%] shadow-pageComponentShadow 
      rounded-lg ${className}`}>{children}</div>
  )
}

export default PageContainer