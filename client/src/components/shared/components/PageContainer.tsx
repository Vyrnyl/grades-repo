import React, { ReactNode } from "react"

type PageContainerProps = {
  children?: ReactNode;
  className?: string;
};

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`bg-slate-100 h-[96%] flex flex-col flex-[80%] shadow-pageComponentShadow 
      rounded-lg ${className}`}>{children}</div>
  )
})

export default PageContainer