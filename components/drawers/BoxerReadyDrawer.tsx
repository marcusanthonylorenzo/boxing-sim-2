import React from 'react'
import { Boxer } from '../../constants/BoxerModel'

interface BoxerReadyDrawerT {
  cornerNumber: number,
  boxersSelectedData: Array<Boxer | null>
}

const BoxerReadyDrawer = ({
  boxersSelectedData
}: BoxerReadyDrawerT ) => {

  return (
    <div>BoxerReadyDrawer</div>
  )
}

export default BoxerReadyDrawer