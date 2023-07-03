import React, { useEffect } from 'react'
import useFightStartContext from '../../hooks/useFightStart'


/* create fightStatus hook
    - round
    - judges
    - pbp Array<round>
*/

const RoundStart = () => {

    const { round, progressRound } = useFightStartContext();

    useEffect(() => console.log(round), [round]);

  return (
    <div>
        <button id={`RoundStart-button`}
            className={`h-full w-full bg-zinc-200 px-5 py-2 rounded-sm shadow-inner text-green-700 font-semibold
            hover:scale-100 hover:duration-150`}
            onClick={() => round < 13 ? progressRound() : console.log(`FIGHT OVER`)}>
                { round === 0 ? `Start Fight` : 
                    round < 12 ? `Next Round: ${round + 1}` : `FIGHT OVER`}
        </button>
    </div>
  )
}

export default RoundStart