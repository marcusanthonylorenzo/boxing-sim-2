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
          (<>
          
            { thisBoxerReady.first_name + ` ` + thisBoxerReady.last_name }
            { thisBoxerReady.hometown + ` ` + thisBoxerReady.nickname }

          </>) : null }
    </div>
  )
}

export default BoxerReadyDrawer