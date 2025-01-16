import { ReactNode } from 'react'

type InputLabelProps = {
  className?: string
  children: ReactNode,
  label: string
}

const InputFieldWrapper = ({ className, children, label }: InputLabelProps) => {
  return (
    <div className={`${className} flex flex-col`}>
        <label>{label}</label>
        {children}
    </div>
  )
}

export default InputFieldWrapper