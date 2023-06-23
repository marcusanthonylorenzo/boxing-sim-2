import React, { useState, useEffect } from 'react'
import { Boxer } from '../../constants/BoxerModel'

interface BoxerReadyDrawerT {
  cornerNumber: number,
  boxersSelectedData: Array<Boxer | null>
}

const BoxerReadyDrawer = ({
  cornerNumber,
  boxersSelectedData
}: BoxerReadyDrawerT ) => {

  const [ thisBoxerReady, setThisBoxerReady ] = useState<Boxer | null>(null)
  
  useEffect(() => {
    cornerNumber === 1 ? setThisBoxerReady(boxersSelectedData[0]) : setThisBoxerReady(boxersSelectedData[1])
  },[boxersSelectedData])

  return (
    <div id={`BoxerReadyDrawer-main`}
      className={`py-3 text-white font-semibold`}>
        {
          thisBoxerReady ? 
          (
          <div className='flex flex-col'>
            <span className='font-bold mb-4'>{ thisBoxerReady.first_name + ` ` + thisBoxerReady.last_name }</span>

            <div id={`BoxerReadyDrawer-info`} className={`text-[12px] w-full`}>
              <h5>{thisBoxerReady.hometown}</h5>
              <h5>{thisBoxerReady.nickname}</h5>
            </div>
          </div>
          ) : null }
    </div>
  )
}

export default BoxerReadyDrawer