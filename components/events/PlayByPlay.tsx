import React from 'react'
import { FightActionT } from '../../containers/FightUpdates'

interface PlayByPlayT {
    eachPlay: FightActionT
}

const PlayByPlay = ({ 
    eachPlay
 } : PlayByPlayT) => {

    const { stats, commentary } = eachPlay.data;

  return (
    <div id={`PlayByPlay-main`}
        className={`flex flex-col relative bg-white h-10 w-[200px]`}>
        <ul>
            <li>{stats}</li>
            <li>{commentary}</li>
        </ul>
    </div>
  )
}

export default PlayByPlay