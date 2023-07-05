import React, { useEffect } from 'react'
import axios from 'axios';
import useFightStartContext from '../../hooks/useFightStart'
import { useMutation } from 'react-query';
import { Boxer } from '../../constants/BoxerModel';


/* create fightStatus hook
    - round
    - judges
    - pbp Array<round>
*/

const RoundStart = () => {

    const { round, progressRound, setFightStart, boxerSelected } = useFightStartContext();

    // useEffect(() => console.log(round), [round]);

    const fightMutation = useMutation({
        mutationFn: async (boxerSelected: Array<Boxer>) : Promise<any> => {
          Promise.all([
            // await axios.post('/api/boxers', newBoxer),
            await axios.post('/api/fight_night', {
                boxers: boxerSelected
            })
          ]).then(values => {
            progressRound()
            return values
          })
        }
      })

  return (
    <div>
        <button id={`RoundStart-button`}
            className={`h-full w-full bg-zinc-200 px-5 py-2 rounded-sm shadow-inner text-green-700 font-semibold
            hover:scale-100 hover:duration-150`}
            onClick={() => round < 13 ? fightMutation.mutateAsync(boxerSelected) : null}>
                { round === 0 ? `Start Fight` : 
                    round < 12 ? `Next Round: ${round + 1}` : `FIGHT OVER`}
        </button>
    </div>
  )
}

export default RoundStart