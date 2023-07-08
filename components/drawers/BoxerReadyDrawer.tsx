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

            <div id={`BoxerReadyDrawer-info`} className={`relative text-[14px] w-full mb-4`}>
              <h5 className='mb-2'>Hometown: {thisBoxerReady.hometown}</h5>
              <h5 className='mb-2'>Placeholder random bio text: {thisBoxerReady.nickname}</h5>
            </div>

            <div id={`BoxerReadyDrawer-stats`} className={`relative  border-white border-2 h-[30%] mb-4 p-2`}>
              Fight stats and charts:

              <div id={``} className={`text-xs`}>
                <ul>
                  <li>Punches Landed: [in progress]</li>
                  <li>Punches Thrown: [in progress]</li>
                </ul>
              </div>
              
            </div>

            <div id={`BoxerReadyDrawer-stats`} className={`relative border-white border-2 h-[30%] p-2`}>
              Recent Fight History:
              <div id={``} className={`text-xs`}>
                <ul>
                  <li>vs [example fighter name]: win</li>
                  <li>vs [example fighter name]: win</li>
                </ul>
              </div>
              
            </div>

          </div>
          ) : null }
    </div>
  )
}

export default BoxerReadyDrawer