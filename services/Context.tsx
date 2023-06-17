import { createContext } from 'react'
import { ClickedBoxerCardsT } from '../constants/State'


// const { clickedBoxerCards, setClickedBoxerCards } = useActiveBoxerSelection([]); //get state from hook, create global context
const ClickedBoxerCardContext = createContext<ClickedBoxerCardsT>([]);

export { ClickedBoxerCardContext }
