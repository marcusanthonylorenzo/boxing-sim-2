import React from 'react'
import { Boxer } from '../constants/BoxerModel'
import Image from 'next/image'
import useFightStartContext from '../hooks/useFightStart'

interface ArenaPropT {
    boxerSelected: Array<Boxer| null> | Array<null>,
    parentState?: {

    },
    components?: {

    }
}

const Arena = ({
    boxerSelected,
    parentState,
    components,

} : ArenaPropT ) => {

    const [ fightStart ] = useFightStartContext();
  
    // console.log(`Arena top level`, boxerSelected)

    // 1. Client: load boxers in Client, send boxers props to SSR
    // 2. Client: Add subscription here in Client, to listen to Server for roundUpdates
    // 3. Server: run method roundStart, emitting data to Client
    // 4. Client: run until round finished, display CoachesCorner modal
    // 5. Client: persist user actions during CoachesCorner modal, run mutation
    // 6. Server: listen for mutation, run roundStart

  return (
    <div className='flex items-center justify-center h-full w-full'>
      {/* <div className='h-full w-full relative z-49'> */}
        {/* <Image src="/boxing_ring2.jpg" alt="boxing ring overhead"
          // height="400%" width="500%"
          layout="fill"
         /> */}
      {/* </div> */}

      <div id="Arena-main"
        className={` shadow-xl flex fixed items-center z-51 justify-center
        ${fightStart && ``}`}>
          <h2 className='relative'> Arena </h2>
                
      </div>

    </div>
  )
}

export default Arena