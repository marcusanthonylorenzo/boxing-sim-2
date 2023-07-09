import React from 'react'
import boxingman from "../public/boxingman.svg"

const Logo = () => {

    console.log(boxingman)
  return (
    <div>
        <div id={`Logo-main`} className={`grid grid-cols-3 items-center w-[26vw] mr-20 p-4 rounded-md bg-[#1f2957]`}>
           
            <div id={`Logo-text`} className={`col-start-1 flex flex-col col-span-2 `}>
                <span id={`Logo-text-title`} className={`font-bold text-[36px]`}>
                    <em>Ringcraft</em>
                </span>
                <div id={`Logo-text-subtext`} className={`mt-[-2%] text-[14px] font-medium`}>
                    <h4>A boxing data simulator</h4>
                </div>
            </div>
            <div id={`Logo-icon`} className={`col-start-3 flex items-center font-semibold text-[12px] rounded-md justify-center bg-[#b92525] p-2 h-full`}>
                <img src={`${boxingman.src}`} />
            </div>
        </div>
    </div>
  )
}

export default Logo