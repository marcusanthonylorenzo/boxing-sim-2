import { useState, createContext, useContext, useMemo } from 'react'

const FightStartContext = createContext<any>("default")

export const FightStartProvider = ({ children }: any) => {
  const [ fightStart, setFightStart ] = useState<boolean>(false)

  const fightStartValue = useMemo(() => [fightStart, setFightStart], [fightStart])

return (
    <FightStartContext.Provider value={fightStartValue}>
        {children} 
    </FightStartContext.Provider>
    )
}

export default function useFightStartContext() {
  return useContext(FightStartContext)
}
