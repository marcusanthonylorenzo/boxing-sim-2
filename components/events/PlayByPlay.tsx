import React from 'react'
import { FightActionT } from '../../containers/FightUpdates'
import { DamageOutputT } from '../../controllers/FightController';

interface PlayByPlayT {
    eachPlay: DamageOutputT
}

const PlayByPlay = ({ 
    eachPlay
 } : PlayByPlayT) => {

    const { attacker, defender, damage } = eachPlay;

  return (
    <div id={`PlayByPlay-main`}
        className={`flex flex-col relative bg-white h-16 w-[200px] my-1 px-4 py-2 shadow-2xl rounded-sm`}>
        <ul>
            <li>{attacker} : {damage} </li>
            <li>{defender}</li>
        </ul>
    </div>
  )
}

export default PlayByPlay