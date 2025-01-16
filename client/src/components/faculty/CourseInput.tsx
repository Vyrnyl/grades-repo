import React from 'react'

type CourseInputProps = {
    name?: string,
    value?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CourseInput = ({ name, value, className, onChange } : CourseInputProps) => {
  return (
    <input 
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-transparent h-[2.5rem] w-[100%] focus:outline-none border-b-2 border-slate-500
        rounded-sm px-2 ${className}`}
    />
  )
}

export default CourseInput