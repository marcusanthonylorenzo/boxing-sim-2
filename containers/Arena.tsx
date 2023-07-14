import React, { useEffect } from 'react'
import axios from 'axios'
import { Boxer } from '../constants/BoxerModel'
import Image from 'next/image'
import useFightStartContext from '../hooks/useFightStart'
import RoundStart from '../components/events/roundStart'
import { AnimatePresence, motion } from 'framer-motion'
import FightUpdates from './FightUpdates'

interface ArenaPropT {
    boxerSelected: Array<Boxer| null> | Array<null>,
    parentState?: {

    },
    components?: {

    }
}

const Arena = ({
    boxerSelected,
    parentState,
    components,

} : ArenaPropT ) => {

    const { fightStart, fightId, setFightId, fightIntros, setFightIntros, round, setFightOver, refreshFightData } = useFightStartContext();

  useEffect(() => {


    if (round > 12) {
      setFightOver(true)
    } else {
      refreshFightData(fightId)
        .then((val: any) => console.log(`refreshFightData promise`, val))
    }
  }, [round])
    
    //if rounds have not started, fightIntros true, once rounds have started, fightIntros are always false
    useEffect(() =>  round === 0 ? setFightIntros(true) : setFightIntros(false), [round])

    useEffect(() => {
      const createFightNightRecord = async () => {
        const data = await axios.post('/api/fight_night', {
          boxerOne: boxerSelected[0],
          boxerTwo: boxerSelected[1]
        });   
        return data
      };

    try {
      round === 0 && createFightNightRecord()
        .then(val => {
          console.log(`fight night creation response`, val.data)
          setFightId(val.data.id)
        })
    } catch (err) {
      console.log(err)
    }
    }, [])
  
    // 1. Client: load boxers in Client, send boxers props to SSR
    // 2. Client: Add subscription here in Client, to listen to Server for roundUpdates
    // 3. Server: run method roundStart, emitting data to Client
    // 4. Client: run until round finished, display CoachesCorner modal
    // 5. Client: persist user actions during CoachesCorner modal, run mutation
    // 6. Server: listen for mutation, run roundStart

  return (
    <div className='flex items-center justify-center h-full w-full'>
      {/* <div className='h-full w-full relative z-49'> */}
        {/* <Image src="/boxing_ring2.jpg" alt="boxing ring overhead"
          // height="400%" width="500%"
          layout="fill"
         /> */}
      {/* </div> */}

      <AnimatePresence>
      <motion.div id="Arena-main"
        initial={{ opacity: 0, scale: "60%" }}
        animate={{ opacity: 1, x: 0, scale: "90%",
          transition: { duration: 0.3, delay: 0.3} }}
        className={`shadow-2xl rounded-md flex flex-col fixed px-0 py-4 items-center z-51 justify-center h-[70vh] w-[65vw]
        ${fightStart && ``}`}>


          <div id={`Arena-content`}
            className={`flex flex-col relative w-full justify-center bg-slate-100 text-zinc-600 font-semibold px-4 py-3 my-6 overflow-y-auto overflow-x-hidden`}>
              {/* <h2 className='relative mb-10'>
              Welcome to the Arena, fights are not yet available.<br/>
              Fight Logic and realtime round-by-round display now currently in-development!
             </h2> */}

             <FightUpdates />

             <div id={`Arena-RoundStart`}
              className={`flex relative top-0`}>
                <RoundStart />
            </div>
          </div>


              
      </motion.div>
      </AnimatePresence>


    </div>
  )
}

export default Arena