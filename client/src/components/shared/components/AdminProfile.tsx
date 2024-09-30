import React from 'react'

const AdminProfile = () => {
  return (
    <div className='bg-cya-200 h-[5rem] flex flex-col items-center justify-end pt-4 relative'>
        <div className='bg-gree-200 inline-block flex justify-center items-center gap-[2rem] pr-[2rem] pb-2 absolute bottom-[-1rem]'>
            <div className='bg-green-300 h-[2.5rem] w-[2.5rem] rounded-full grid place-items-center font-medium '>AN</div>
            <span className='font-medium text-white'>Alice</span>
        </div>
        <hr className='bg-slate-600 h-[.15rem] w-[80%] rounded-lg absolute bottom-[-1rem]' />
    </div>
  )
}

export default AdminProfile