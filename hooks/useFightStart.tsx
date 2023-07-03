import { useState, createContext, useContext, useMemo, useEffect } from 'react'

const FightStartContext = createContext<any>("default")

export const FightStartProvider = ({ children }: any) => {
  const [ fightStart, setFightStart ] = useState<boolean>(false)
  const [ round, setRound ] = useState<number>(0);

  useEffect(() => {
    !fightStart ? setRound(0) : null
  }, [fightStart]);

  const progressRound = () => {
    if (round <= 12) {
     setRound(prevRound => prevRound + 1)
    } else {
      console.log(`FIGHT OVER`)
    }
  }

  const fightStartValue = useMemo(() => {
    return {
      fightStart, setFightStart,
      round, progressRound
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
