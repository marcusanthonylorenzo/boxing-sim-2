import React from 'react'
import PlayByPlay from '../components/events/PlayByPlay'

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

const placeholder: FightActionT[] = [
    {
        round: 1,
        data: {
            stats: [],
            commentary: [
                "test play by play",
                "test 2"
            ]
        }
    }
]

const FightUpdates = () => {

  return (
    <div id={`FightUpdates-main`}
        className={`h-full w-full flex flex-col`}>

                { //Map play_by_play here
                    placeholder.map((eachPlay) => {
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