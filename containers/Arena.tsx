import React from 'react'
import { Boxer } from '../constants/BoxerModel'

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
  
    console.log(`Arena top level`, boxerSelected)

    // 1. Client: load boxers in Client, send boxers props to SSR
    // 2. Client: Add subscription here in Client, to listen to Server for roundUpdates
    // 3. Server: run method roundStart, emitting data to Client
    // 4. Client: run until round finished, display CoachesCorner modal
    // 5. Client: persist user actions during CoachesCorner modal, run mutation
    // 6. Server: listen for mutation, run roundStart

  return (
    <div id="Arena-main"
      className={`bg-[#928585] flex relative items-center justify-center`}>
        <h2 className='relative'> Arena </h2>
      

      
    </div>
  )
}

export default Arena