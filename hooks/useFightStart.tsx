import { useState, createContext, useContext, useMemo, useEffect } from 'react'

const FightStartContext = createContext<any>("default")

export const FightStartProvider = ({ children }: any) => {
  const [ fightStart, setFightStart ] = useState<boolean>(false)
  const [ round, setRound ] = useState<number>(0);
  const [ fightOver, setFightOver ] = useState<boolean>(false)

  useEffect(() => {
    !fightStart ? setRound(0) : null
  }, [fightStart]);

  // useEffect(() => {
  //   if (round > 12) {
  //     setFightOver(true)

  //   }
  // }, [round])

  const progressRound = () => {
    if (round < 12) {
      setRound(prevRound => prevRound + 1)
    } else {
      console.log(`FIGHT OVER`) 
      setFightOver(true)
    }
  }

  const fightStartValue = useMemo(() => {
    return {
      fightStart, setFightStart,
      round, progressRound,
      fightOver
    }}, [fightStart, round])

return (
    <FightStartContext.Provider value={fightStartValue}>
        {children} 
    </FightStartContext.Provider>
    )
}

export default function useFightStartContext() {
  return useContext(FightStartContext)
}
