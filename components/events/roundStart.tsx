import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DamageOutputT } from '../../controllers/FightController';
import useFightStartContext from '../../hooks/useFightStart'
import { useMutation } from 'react-query';
import { Boxer } from '../../constants/BoxerModel';


/* create fightStatus hook
    - round
    - judges
    - pbp Array<round>
*/

const RoundStart = () => {

    const {
        fightId, fightOver, round, progressRound,
        setFightStart, boxerSelected,
        fightData, setFightData,
        refreshFightData
    } = useFightStartContext();

    const [ getResults, setGetResults ] = useState<any>([])

    const fightMutation = useMutation({
        mutationFn: async (boxerSelected: Array<Boxer>) : Promise<any> => {
          Promise.all([
            await axios.patch('/api/fight_night', {
                id: fightId,
                boxerOne: boxerSelected[0],
                boxerTwo: boxerSelected[1]
            })
          ]).then(values => {
            console.log(`32: values`, values)
            // refreshFightData(fightId)
              // .then((value: any) => {
              //   // setGetResults(value)
              // })

            const getResults = values[0].data.damageOutputResults //THIS IS THE PBP
            console.log(`get results length`, typeof getResults, getResults)
            try {
                setFightData((prev: any) => [ ...prev, { ...getResults[0] }]);
                getResults ?
                getResults.forEach((scrap: any) => {
                    scrap.damage <= 0 ? console.log(`${scrap.defender} uses their footwork to keep range`) : console.log(scrap)
                })
                : console.log(`no get results`)
            } catch (err: unknown) {
                console.log(err)
            }
            progressRound();
          })
        }
      })

  return (
    <div>
        <button id={`RoundStart-button`}
            className={`h-full w-full bg-zinc-200 px-5 py-2 rounded-sm shadow-inner text-green-700 font-semibold
            hover:scale-100 hover:duration-150`}
            onClick={() => !fightOver ? fightMutation.mutateAsync(boxerSelected) : null}>
                { round === 0 ? `Start Fight` : 
                    round < 12 ? `Next Round: ${round + 1}` : `FIGHT OVER`}
        </button>
    </div>
  )
}

export default RoundStart