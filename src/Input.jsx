import React from 'react'
function Input({
    label='',
    type='text',
    className='',
    ...props
}, ref) {
  return (
    <div className='w-full'>
        {label && <label className={`inline-block text-xl  mb-1 pl-1 text-gray-600`}>{label}</label>}
        <input type={type} 
        className={`w-full px-4 py-2 rounded-lg text-xl  text-black placeholder-gray-600 focus:bg-gray-50 duration:200 border border-gray-700 ${className}`}{...props}
        ref={ref}
        />
    </div>
  )
}

export default React.forwardRef(Input)