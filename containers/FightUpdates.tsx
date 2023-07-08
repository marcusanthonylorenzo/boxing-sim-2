import React, { useEffect } from 'react'
import PlayByPlay from '../components/events/PlayByPlay'
import useFightStartContext from '../hooks/useFightStart'
import { DamageOutputT } from '../controllers/FightController'

/*
    1. subscribe to updates on server
    2. update Array PbP
    3. map Pbp child
*/

export interface FightActionT {
    round: number,
    data: {
        stats: Array<any>,
        commentary: Array<string>,
    }
}

//Subscribe to these updated via server events
const placeholder: FightActionT[] = [
    {
        round: 1,
        data: {
            stats: [{
                aggressor: {
                    name: "",
                    punchesThrown: 4,
                    punchesLanded: 1,
                    
                }
            }],
            commentary: [
                "test play by play",
                "test 2"
            ]
        }
    }
]

const FightUpdates = () => {

    const { fightData } = useFightStartContext();
    
    useEffect(() => console.log(`fightUpdates fightData`, fightData) , [fightData])

  return (
    <div id={`FightUpdates-main`}
        className={`bg-black h-full w-full absolute mx-auto items-center justify-center flex flex-col`}>

                { //Map play_by_play here
                    fightData && fightData.map((eachPlay: DamageOutputT) => {
                        return (
                            <div id={`FightUpdates-play_by_play`}
                                className={`relative`}>
                                <PlayByPlay eachPlay={eachPlay} />
                            </div>
                        )
                    })

                }

    </div>
  )
}

export default FightUpdates