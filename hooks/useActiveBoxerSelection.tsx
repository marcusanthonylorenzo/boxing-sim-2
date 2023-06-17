import { useState, useEffect } from 'react'
import { useQuery } from "react-query"
import { queryCache, queryClient } from "./useSharedState"
import { Boxer } from "../constants/BoxerModel";
import { ClickedBoxerCardsT } from '../constants/State';

const useActiveBoxerSelection = (
    // key: string,
    initialValue: ClickedBoxerCardsT
    ) : { 
        clickedBoxerCards: ClickedBoxerCardsT,
        setClickedBoxerCards: React.Dispatch<React.SetStateAction<ClickedBoxerCardsT>>
    } => {

    const [ clickedBoxerCards, setClickedBoxerCards ] = useState<ClickedBoxerCardsT>(initialValue);
    
    useEffect(() => console.log(`updated boxer cards`, clickedBoxerCards), [clickedBoxerCards])

//     const initialDataDefault = [{}]
//     const { data: clickedBoxerCards } = useQuery(key, () => queryCache.find(key),
//     // { initialData: initialValue }
//   );
//     useEffect(() => {
//         console.log(clickedBoxerCards)
//     }, [])


  
//     const setClickedBoxerCards = (value: Array<Boxer>) => queryClient.setQueryData(key, value);
//     console.log(`useActiveBoxer...hook`, clickedBoxerCards)

    return { clickedBoxerCards, setClickedBoxerCards } //update in UI
};

export default useActiveBoxerSelection
