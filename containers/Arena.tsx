import React from 'react'
import { Boxer } from '../constants/BoxerModel'

interface ArenaPropT {
    boxers: {
        boxer_one: Boxer,
        boxer_two: Boxer
    },
    parentState?: {

    },
    components?: {

    }
}

const Arena = ({
    boxers,
    parentState,
    components,

} : ArenaPropT ) => {

    const { boxer_one, boxer_two } = boxers

    // 1. Client: load boxers in Client, send boxers props to SSR
    // 2. Client: Add subscription here in Client, to listen to Server for roundUpdates
    // 3. Server: run method roundStart, emitting data to Client
    // 4. Client: run until round finished, display CoachesCorner modal
    // 5. Client: persist user actions during CoachesCorner modal, run mutation
    // 6. Server: listen for mutation, run roundStart

  return (
    <div>Arena</div>
  )
}

export default Arena