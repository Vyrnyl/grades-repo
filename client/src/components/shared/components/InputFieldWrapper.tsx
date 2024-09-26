import { ReactNode } from 'react'

type InputLabelProps = {
    children: ReactNode,
    label: string
}

const InputFieldWrapper = ({ children, label }: InputLabelProps) => {
  return (
    <div className="flex flex-col">
        <label>{label}</label>
        {children}
    </div>
  )
}

export default InputFieldWrapper