import { createContext } from 'react'
import useActiveBoxerSelection from '../hooks/useActiveBoxerSelection'
import { ClickedBoxerCardsT } from '../constants/State'

// const { clickedBoxerCards, setClickedBoxerCards } = useActiveBoxerSelection([]); //get state from hook, create global context
const ClickedBoxerCardContext = createContext([]);

export { ClickedBoxerCardContext }
