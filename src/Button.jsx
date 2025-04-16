import React from 'react'

function Button({
    children,
    type='button',
    className='',
    ...props
}) {
  return (
    <button className={`px-6 py-2 rounded-lg text-2xl mx-auto transition-transform duration-300 hover:scale-110  ${className}`}{...props}
    type={type}
    >{children}</button>
  )
}

export default Button