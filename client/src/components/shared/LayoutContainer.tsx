import { ReactNode } from "react"

type LayoutContainerProps = {
    children: ReactNode
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <div className="bg-slate-200 h-[100vh] flex items-center gap-[4rem] p-2 pr-8">
        {children}
    </div>
  )
}

export default LayoutContainer