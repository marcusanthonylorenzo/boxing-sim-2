import { useState, createContext, useContext, useMemo, useEffect } from 'react'
import { Boxer } from '../constants/BoxerModel'
import { DamageOutputT } from '../controllers/FightController'
import axios from 'axios'

const FightStartContext = createContext<any>("default")

const supabaseAPI_fight_history = "https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/fight_history";
const headersConfig = {
  'last_name-Type': 'application/json',
  apiKey:  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`
}

export const FightStartProvider = ({ children }: any) => {
  const [ fightId, setFightId ] = useState<string>(``)
  const [ boxerSelected, setBoxerSelected ] = useState<Array<Boxer | null>>([])
  const [ fightIntros, setFightIntros ] = useState<boolean>(false)
  const [ fightStart, setFightStart ] = useState<boolean>(false)
  const [ round, setRound ] = useState<number>(0);
  const [ fightOver, setFightOver ] = useState<boolean>(false)
  const [ fightData, setFightData ] = useState<Array<DamageOutputT | undefined>>([])

  useEffect(() => {
    !fightStart ? setRound(0) : setFightOver(false);
  }, [fightStart]);

  // useEffect(() => {

  //   const refreshFightData = async () => {
  //     const { data } = await axios.get('/api/fight_night', {
  //       headers: headersConfig
  //     })
  //     return data;
  //   };

  //   if (round > 12) {
  //     setFightOver(true)
  //   } else {
  //     refreshFightData()
  //       .then(val => console.log(`refreshFightData promise`, val))
  //   }
  // }, [round])

  const refreshFightData = async (id: string) => {
    const { data } = await axios.get(supabaseAPI_fight_history + `?id=eq.${id}&select=*`, {
      headers: headersConfig
    })
    if (fightData.length === 0) {
      await setFightData([...data[0].play_by_play ] )
      console.log(`fightData length is 0`)
    } else if (fightData.length > 0) {
      data[0].play_by_play.forEach((play: DamageOutputT) => {
        setFightData((prev) => [...prev, play ] )
        console.log(`fightData length is greater than 0`)
      })
    }
  };

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
      fightId, setFightId,
      fightIntros, setFightIntros,
      fightStart, setFightStart,
      round, progressRound,
      fightOver,
      boxerSelected, setBoxerSelected,
      fightData, setFightData,
      resetFightData, refreshFightData
    }}>
        {children} 
    </FightStartContext.Provider>
    )
}

export default function useFightStartContext() {
  return useContext(FightStartContext)
}
