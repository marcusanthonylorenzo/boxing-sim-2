import { useState, createContext, useContext, useMemo, useEffect } from 'react'
import { Boxer } from '../constants/BoxerModel'
import { DamageOutputT } from '../controllers/FightController'

const FightStartContext = createContext<any>("default")

export const FightStartProvider = ({ children }: any) => {
  const [ boxerSelected, setBoxerSelected ] = useState<Array<Boxer | null>>([])
  const [ fightStart, setFightStart ] = useState<boolean>(false)
  const [ round, setRound ] = useState<number>(0);
  const [ fightOver, setFightOver ] = useState<boolean>(false)
  const [ fightData, setFightData ] = useState<Array<DamageOutputT | undefined>>([])

  useEffect(() => {
    !fightStart ? setRound(0) : setFightOver(false);
  }, [fightStart]);

  // useEffect(() => {
  //   if (round > 12) {
  //     setFightOver(true)

  //   }
  // }, [round])

  const progressRound = () => {
    if (round < 12) {
      console.log(`round over`)
      setRound(prevRound => prevRound + 1)
    } else {
      console.log(`FIGHT OVER`) 
      setFightOver(true)
    }
  }

  const resetFightData = async (callback?: () => void) => {
    //match obj with table on Supabase then
    await setFightData([]);
    if (callback) await callback();
    console.log(`fight data reset`, [])
  }

return (
    <FightStartContext.Provider value={{
      fightStart, setFightStart,
      round, progressRound,
      fightOver,
      boxerSelected, setBoxerSelected,
      fightData, setFightData,
      resetFightData
    }}>
        {children} 
    </FightStartContext.Provider>
    )
}

export default function useFightStartContext() {
  return useContext(FightStartContext)
}
