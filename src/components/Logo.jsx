import React from 'react'

function Logo({width = 'w-[50px]'}) {
  return (
    <div>
        <img src="https://www.chaicode.com/chaicode-white.svg" className={`transition-tranform duration-300 hover:scale-110 cursor-pointer ${width}`} alt="" />
    </div>
  )
}

export default Logo