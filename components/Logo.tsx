import React from 'react'

const Logo = () => {
  return (
    <div>
        <div id={`Logo-main`} className={`grid grid-cols-3 items-center w-[26vw] mr-20 bg-[#1f2957]`}>
           
            <div id={`Logo-text`} className={`col-start-1 flex flex-col col-span-2 `}>
                <span id={`Logo-text-title`} className={`font-bold text-[32px]`}>
                    <em>Ringcraft</em>
                </span>
                <div id={`Logo-text-subtext`} className={`font-semibold`}>
                    <h4>A boxing data simulator</h4>
                </div>
            </div>
            <div id={`Logo-icon`} className={`col-start-3 flex items-center font-semibold text-[12px] rounded-md justify-center bg-[#b92525] p-2 h-full`}>
                Logo placeholder
            </div>
        </div>
    </div>
  )
}

export default Logo