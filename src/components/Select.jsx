import React from 'react'

function Select({
    options,
    label,
    className='',
    ...props
}, ref) {
  return (
    <>
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1 pr-3 text-2xl text-gray-50'>{label}</label>}
            <select
            className='w-full max-w-sm px-5 py-2 rounded-lg bg-white shadow-lg text-black mt-5 text-xl'
            ref={ref}
            >
                {options.map((option) => (
                    <option key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    </>
  )
}

export default React.forwardRef(Select)