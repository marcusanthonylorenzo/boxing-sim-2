import { useState, createContext, useContext, useMemo, useEffect } from 'react'
import { Boxer } from '../constants/BoxerModel'

const FightStartContext = createContext<any>("default")

export const FightStartProvider = ({ children }: any) => {
  const [ boxerSelected, setBoxerSelected ] = useState<Array<Boxer | null>>([])
  const [ fightStart, setFightStart ] = useState<boolean>(false)
  const [ round, setRound ] = useState<number>(0);
  const [ fightOver, setFightOver ] = useState<boolean>(false)

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

return (
    <FightStartContext.Provider value={{
      fightStart, setFightStart,
      round, progressRound,
      fightOver,
      boxerSelected, setBoxerSelected
    }}>
        {children} 
    </FightStartContext.Provider>
    )
}

export default function useFightStartContext() {
  return useContext(FightStartContext)
}
