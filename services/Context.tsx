import { createContext } from 'react'
import { ClickedBoxerCardsT } from '../constants/State'
import { Boxer } from '../constants/BoxerModel'
import useActiveBoxerSelection from '../hooks/useActiveBoxerSelection'
interface ContextTypes {
    clickedBoxerCards: ClickedBoxerCardsT
    setClickedBoxerCards: React.Dispatch<React.SetStateAction<ClickedBoxerCardsT>>
}

// const { clickedBoxerCards, setClickedBoxerCards } = useActiveBoxerSelection(); //get state from hook, create global context
const ClickedBoxerCardContext = createContext<any>({
    // clickedBoxerCards,
    // setClickedBoxerCards
});

export { ClickedBoxerCardContext }
