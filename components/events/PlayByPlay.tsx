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
        className={`flex flex-col relative bg-white h-10 w-[200px]`}>
        <ul>
            <li>{attacker} : {damage} </li>
            <li>{defender}</li>
        </ul>
    </div>
  )
}

export default PlayByPlay